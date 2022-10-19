// import Scene from '@/components/canvas/Scene'
import dynamic from 'next/dynamic'
import router from 'next/router'

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
})

// Step 5 - delete Instructions components
const Page = (props) => {
  return (
    <>
      {/* <h1 className='mx-auto text-center w-100'>{props.title}</h1> */}
      <div className='flex justify-center'>
        <button
          onClick={() => {
            router.push(`/`)
          }}
          className='px-4 py-2 mx-auto mt-5 font-bold text-center text-white bg-blue-500 rounded w-100 hover:bg-blue-700'
        >
          Home
        </button>
      </div>
    </>
  )
}

Page.r3f = (props) => (
  <>
    <Scene />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Scene',
    },
  }
}
