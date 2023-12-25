import imgUrl from '../assets/imgs/aboutimg.jpg'

export function About() {
    return (
        <section className="about">
            <div className="title">
                about
                <br />
                me
            </div>

            <div className="imageprofile">
                <img src="imgme.jpeg" width="300" height="300" />
                
            </div>

            <h1>Hi, I'm Lee Aharon
                <br />
                The app I'm developing is Gmail Demo
                I use a react.</h1>
            {/* <img src={imgUrl} alt="" /> */}


        </section>



    )
}
