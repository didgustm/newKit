import { fetchMarkdownPosts } from '$js/post'
import { json } from '@sveltejs/kit'

export const GET = async () => {
    const allPosts = await fetchMarkdownPosts()
    const sortedPosts = allPosts.sort((a, b) => {
        return b.meta.id - a.meta.id
    })

    return json(sortedPosts)
}