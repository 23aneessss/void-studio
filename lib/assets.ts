/*
 * Asset manifest — Higgsfield-generated media.
 *
 * Videos are generated via the Higgsfield MCP (model: veo3_1_lite) and the
 * source CloudFront URLs are preserved below for provenance. The files are also
 * downloaded into /public/videos so the site is fully self-hosted and
 * deploy-ready (the remote signed URLs can expire).
 *
 * Generated this build (free-plan budget = 10 credits, 4 credits / clip):
 *   - hero  : "dark luxury abstract cinematic background, deep blacks, gold particles"
 *   - about : "abstract dark fluid motion, ink in water, ultra slow motion, b&w"
 *
 * The 3 Work-card previews reuse these two clips with distinct color grading
 * (see lib/data.ts `grade`) — swap in dedicated clips by topping up credits and
 * pointing the `video` fields at new /public/videos files.
 */

export const HIGGSFIELD = {
  hero: {
    local: '/videos/hero.mp4',
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3DVTv79fvzJzhtH5bOqJucO6xcj/hf_20260614_142321_f99197f1-1836-41b2-ac2a-be6aee22b0e7.mp4',
    jobId: 'f99197f1-1836-41b2-ac2a-be6aee22b0e7',
    model: 'veo3_1_lite',
  },
  about: {
    local: '/videos/about.mp4',
    remote: '', // filled after the about job completes
    jobId: '1ce70d39-3e3d-4238-9c78-5006cef067f3',
    model: 'veo3_1_lite',
  },
} as const;
