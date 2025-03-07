import AboutUs from "./(HomeComponents)/AboutUs/AboutUs";
import Banner from "./(HomeComponents)/Banner/Banner";




const Home = () => {
    return (
        <div className="lg:space-y-20 space-y-10 2xl:px-[300px]">
            <Banner/>
            <AboutUs/>
        </div>
    );
};

export default Home;