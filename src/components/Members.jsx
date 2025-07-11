import GradientCards from '../blocks/Components/GradientCards/GradientCards'
import OurTeam from '../blocks/TextAnimations/OurTeam/OurTeam'

const Members = () => {
  return (
    <section id="members-section" className='w-full min-h-screen bg-black  overflow-hidden  overflow-y-auto'>
      <div className='mt-10 '>
        <OurTeam/>
      </div>
        <div className='w-full mt-20 mb-20 overflow-hidden overflow-y-auto min-h-screen'>
        <GradientCards/>
        </div>
    </section>
  )
}

export default Members