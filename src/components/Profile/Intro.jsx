import React from 'react';


const iconUrl = {
    "Github": "/icons/github.png",
    "LinkedIn": "/icons/linkedin.png",
    "Website": "/icons/globs.png",
}

const Intro = ({profile}) => {
    return (
        <div className="card">
           <div className="card-meta">
               <h1 className="text-xl font-semibold color_h1">Intro</h1>
           </div>

            <div>

                <p className={"text-sm color_h3"}>{profile.bio}</p>

                <li className="flex items-center gap-x-1  list-none text-sm color_h3 mt-5">
                    <img className="filter-placeholder-img" src="/icons/homeicon.png" alt=""/>
                    From <span className="color_h2">{profile.currentCity}</span>
                </li>
                <li className="flex items-center gap-x-1  list-none text-sm color_h3 mt-5">
                    <img className="filter-placeholder-img" src="/icons/location.png" alt=""/>
                    From <span className="color_h2">{profile.hometown}</span>
                </li>
                <li className="flex items-center gap-x-1  list-none text-sm color_h3 mt-5">
                    <img className="filter-placeholder-img" src="/icons/homeicon.png" alt=""/>
                    {profile.relationship}
                </li>

                <div>
                    {profile.socialLinks.map(link=>(
                        <li className={`flex items-center gap-x-1  list-none text-sm color_h3 mt-5`}>
                            <img className="filter-placeholder-img" src={iconUrl[link.name]} alt=""/>
                            <a className="text-primary-400" href={link.link}>{link.link}</a>
                        </li>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Intro;