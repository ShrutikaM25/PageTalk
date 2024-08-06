import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Info from "./_components/Info";

const LandingPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6">
                <Hero />
            </div>
            <Info />
            <Footer />
        </div>
    );
};

export default LandingPage;
