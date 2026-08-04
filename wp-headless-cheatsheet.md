---
title: Headless WordPress Cheatsheet
head:
  - - meta
    - name: robots
      content: noindex
---

# Headless WordPress + Next.js cheatsheet

Personal reference notes on the WordPress REST API and common headless build patterns. Not linked from navigation.

## Where to start on an unfamiliar codebase

Before changing anything:

1. **`package.json`** — framework and version (Next.js/Gatsby/etc.), and which routing convention (Next's Pages Router vs. App Router look and behave differently). Version matters — e.g. `params`/`searchParams` became async Promises in recent Next.js, so an older tutorial's syntax can be silently wrong.
2. **Find the data-fetching layer first** — grep for `fetch(` or the WP site's URL to locate the file(s) that talk to the REST API (often `lib/`, `utils/`, or similar). Read that before touching any page component.
3. **Hit the WP REST API directly** — visit `/wp-json/` on the backend to see registered namespaces and custom endpoints, then the specific endpoint you need, with `?_embed` added. Confirm the actual data shape before writing code against it, don't assume.
4. **Check environment config** (`.env`/`.env.local`) for the WP backend URL the app is actually pointed at, so you're looking at the same data source it fetches from.
5. **Skim the styling approach** — global CSS? Tailwind? CSS Modules? Match whatever convention already exists rather than introducing a new one for a small change.
6. **Run it and click around before changing anything** — so you can tell the difference between "pre-existing behavior" and "something I just broke."

## Core REST endpoints

```
GET /wp-json/                      Discovery index — lists registered namespaces
GET /wp-json/wp/v2/posts           Posts
GET /wp-json/wp/v2/pages           Pages
GET /wp-json/wp/v2/media           Media/attachments
GET /wp-json/wp/v2/media/{id}      A single attachment
GET /wp-json/wp/v2/categories      Category terms
GET /wp-json/wp/v2/tags            Tag terms
GET /wp-json/wp/v2/users           Users/authors
GET /wp-json/wp/v2/{custom-cpt}    Custom post type (uses its rest_base if set)
```

Useful query params:

```
?slug=my-post          Filter by slug instead of ID
?_embed                Resolve reference IDs to full objects (see below)
?per_page=10&page=2    Pagination — response has X-WP-Total / X-WP-TotalPages headers
?search=keyword        Basic search
```

## The `_embed` pattern

Reference fields (author, featured image, taxonomy terms, ACF attachment fields with REST support) come back as **bare IDs by default** — not full objects. This keeps the default response small.

```json
// without ?_embed
{ "featured_media": 18, "categories": [1] }

// with ?_embed
{
  "featured_media": 18,
  "categories": [1],
  "_embedded": {
    "wp:featuredmedia": [ { "id": 18, "source_url": "...", "alt_text": "..." } ],
    "wp:term": [
      [ { "id": 1, "name": "Uncategorized", "taxonomy": "category" } ],
      []
    ]
  }
}
```

Notes:
- `_embedded` doesn't exist at all without `?_embed`.
- `wp:term` bundles **every** taxonomy on the post into one array-of-arrays — don't trust index position, filter by `term.taxonomy` instead.
- Not every reference field is embeddable by default — ACF's own custom fields (e.g. a single Image field) often aren't wired up to `_embed` at all. Check per-field rather than assuming.

## Printing a featured image and a plain custom field

```jsx
// fetch with ?_embed so the featured image resolves — see lib/wordpress.js
const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];

return (
  <article>
    {featuredImage && (
      <img
        src={featuredImage.media_details.sizes.large.source_url}
        alt={featuredImage.alt_text}
        width={featuredImage.media_details.sizes.large.width}
        height={featuredImage.media_details.sizes.large.height}
      />
    )}

    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

    {/* a plain ACF text/number/true-false field — interpolate directly, no dangerouslySetInnerHTML */}
    {post.acf.subtitle && <p>{post.acf.subtitle}</p>}
  </article>
);
```

Two different guards doing two different jobs:
- `featuredImage &&` — the post might not have a featured image set at all, so `_embedded["wp:featuredmedia"]` won't exist.
- `post.acf.subtitle &&` — ACF returns `false` (not `null`/`undefined`) for an unset field. `false`, `null`, and `undefined` all render as nothing when used as a JSX child, so this one check is enough on its own.

## Resolving a list of IDs safely (e.g. an ACF gallery)

Don't trust the order of `_embedded` matching the order of your ID array — build a lookup instead:

```js
const byId = new Map(
  (post._embedded?.["acf:attachment"] ?? []).map((media) => [media.id, media])
);

const images = (post.acf.gallery_field ?? [])
  .map((id) => byId.get(id))
  .filter(Boolean); // drop any IDs that didn't resolve
```

## Extracting one taxonomy out of `wp:term`

```js
const publisherTerms = (post._embedded?.["wp:term"] ?? [])
  .flat()
  .filter((term) => term.taxonomy === "publisher");
```

## ACF gotcha: Return Format only applies in PHP

`get_field('my_field')` respects the field's configured Return Format (Array/URL/ID) in wp-admin. If you're writing a custom `register_rest_field` callback and want the **raw stored value** regardless of that setting, pass `false` as the third argument:

```php
$attachment_id = get_field('icon', $post['id'], false); // always the raw ID
```

## Custom REST field (resolve something server-side instead of a second request)

```php
add_action('rest_api_init', function () {
    register_rest_field('post', 'icon_image', [
        'get_callback' => function ($post) {
            $id = get_field('icon', $post['id'], false);
            if (! $id) return null;

            $src = wp_get_attachment_image_src($id, 'medium');
            return $src ? ['source_url' => $src[0], 'width' => $src[1], 'height' => $src[2]] : null;
        },
    ]);
});
```

## Custom taxonomy (minimal)

```php
add_action('init', function () {
    register_taxonomy('publisher', ['post'], [
        'labels'            => ['name' => 'Publishers', 'singular_name' => 'Publisher'],
        'public'            => true,
        'show_ui'           => true,
        'show_in_rest'      => true, // required for both the block editor UI AND the REST API
        'show_admin_column' => true,
    ]);
});
```

`show_in_rest => true` is the one people forget — without it, the taxonomy won't show a panel in the block editor *or* appear in the REST response.

## Custom post type (minimal)

```php
add_action('init', function () {
    register_post_type('case_study', [
        'labels'       => ['name' => 'Case Studies', 'singular_name' => 'Case Study'],
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rest_base'    => 'case-studies', // controls the REST URL, defaults to the post type slug
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);
});
```

Registering structural code (CPTs, taxonomies, REST fields) in a **plugin**, not a theme's `functions.php` — theme code disappears if the theme ever changes, orphaning the data.

## Next.js App Router: dynamic route + not found

```jsx
// app/posts/[slug]/page.js
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const { slug } = await params; // params is a Promise in recent Next.js
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />;
}
```

## Rendering WP content safely

- `title.rendered` / `content.rendered` / `excerpt.rendered` are pre-rendered HTML strings from WordPress — use `dangerouslySetInnerHTML`.
- A plain custom field (ACF text field, a term's `name`, etc.) is **not** pre-rendered HTML — just interpolate it directly as JSX text, don't wrap it in `dangerouslySetInnerHTML`.
- Guard every optional field before accessing nested properties — ACF returns `false` for an unset field (not `null`/`undefined`), and a missing embed relation is just absent from `_embedded` entirely: `post.acf.someField &&`, `post._embedded?.["..."] ?? []`.
