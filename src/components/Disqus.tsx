
import React from "react"
import { graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"
const Disqus = () => (
    <Disqus
        config={
            /* Replace PAGE_URL with your post's canonical URL variable */
            url: 'https://www.bolimnieweb.pl',
            /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
            identifier: 'bolimnieweb',
            /* Replace PAGE_TITLE with the title of the page */
            title: 'test',
        }
    />
);

export default Disqus