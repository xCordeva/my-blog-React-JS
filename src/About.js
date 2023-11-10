import './About.css'
import React, { useState, useEffect } from 'react';


const About = () => {


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="about">
            <div className="blog-main">
                <img src={require(`${windowWidth >= 800 ? `./images/about-me-desktop.jpg` : `./images/about-me-mobile.jpg`}`)} alt="cat-sneaking-a-peak" />
                <div className="blog-shade"></div>
                <div className="blog-main-details">
                <div className="about-time">
                    <h1>ABOUT ME</h1>
                    <h4>A 4 - minute Read</h4>
                </div>
                </div>
            </div>
            <div className="about-details">

                <p>
                    <h1>So, Who is Cordeva ?</h1>
                    Let's start with the name<span> "Cordeva."</span>  Well, you see, my name is actually <span>Ahmed</span> and not Cordeva. However, in the region that I am from, the name Ahmed is so widespread that no one in my friends or my close circle actually calls me that. They don’t call me Cordeva either, but that’s not the point.
                    <br/><br/>
                    They'll probably call me by my dad's name, <span>AbdElAal</span>, and that's an actual thing here in Egypt, where I live - to call people by their dad's or family name.
                    <br/><br/>
                    Anyway, back to Cordeva. This name was actually my nickname in an online game that I used to play when I was young called "Crossfire", and it just got stuck with me. I started using it in so many of my profiles and other games, and I decided to go by it in the online world.
                    <br/><br/>
                    As for who I am, I am a simple guy from <span>Cairo, Egypt</span>. I just graduated from college with a bachelor’s degree in civil engineering. I decided to replace 'Civil' with 'Software,' hoping to become a software engineer.
                    <h1>My recent years</h1>
                    My journey in college was not the most interesting time in my life. It was eventful, and I made great friends and connections, but I didn't really love what I was studying. Around year 2 in college, I felt that I didn’t fit in with the rest of my colleagues, and I knew I would have to search for another field that interests me. I tried multiple things before shifting to software engineering, all kind of related.
                    <br/><br/>
                    At first, I tried<span> Digital marketing</span>, and I did actually achieve some success, including creating and building a local brand that was later acquired by a guy who ran a similar business. However, I still didn’t like it that much, and I didn't feel much of a rush while working. I spent around 3 years in this career. 
                    <br/><br/>
                    Then, I shifted to<span> Data analysis.</span> I spent around 3 months learning and gathering more about the field, but I also didn’t feel like it suited me. So, finally I decided to switch to becoming a<span> Frontend developer</span>, and I think I am doing okay in it. I still haven't landed my first role yet, but I have learned so much, and I already feel like this is the career I want to spend my life growing in.
                    And this blog was one of the steps in becoming that by trying to create more stuff that's more like me and practicing my skills on the way.
                    <h1>The Purpose of the Blog</h1>
                    Well, I don't think I know exactly why I created this blog, but I think I just wanted a place to document my journey and to share my thoughts along the way.
                    <h1>Am I a Good Writer?</h1>
                    I always liked to write (not in a professional way), but I never published anything I wrote before. So, taking this step and starting a blog was kind of hard, especially since I don't know exactly what I am going to be putting in here. I guess I'll find out on the way.
                    <br/><br/>
                    <span>
                    If you made it this far, then thank you for taking the time to read this random article.
                    Hope you like random stuff because I got lots of them.
                    </span>
                </p>
            </div>
        </div>
        
    );
}
 
export default About;