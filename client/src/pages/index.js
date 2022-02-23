import Head from 'next/head'
import Image from 'next/image'

export default function Home({ blogPosts, gallery }) {
  console.log(blogPosts);
  console.log(gallery)

  return (
    <div>
      <Head></Head>
      {/* Blog */}
      {blogPosts?.data?.map(post => (
        <div key={post.id}>
          {post.attributes.postImage.data.map(img => (
            <Image key={img.id} src={process.env.NEXT_PUBLIC_API_URL + img.attributes.url} width={300} height={300} />
          ))}
          <h4>{post.attributes.datePosted}</h4>
          <p>{post.attributes.postBody}</p>
        </div>
      ))}
      {/* Gallery */}
      {gallery?.data?.map(img => (
        <div key={img.id}>
          <Image src={process.env.NEXT_PUBLIC_API_URL + img.attributes.image.data.map(image => (
            image.attributes.url
          ))} width={300} height={300} />
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const blogRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    }
  )

  const galleryRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/galleries?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    }
  )

  const blogPosts = await blogRes.json()
  const gallery = await galleryRes.json()

  return {
    props: {
      blogPosts,
      gallery
    }
  }
}