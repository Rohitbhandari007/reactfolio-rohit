import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						

						<div className="work">
							<img
								src="./work.png"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">Pathways Technologies Pvt Ltd</div>
							<div className="work-subtitle">
								Full Stack Web Developer
							</div>
							<div className="work-duration">Aug 2022 - Present </div>
						</div>
						<div className="work">
							<img
								src="./work.png"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">Freelance</div>
							<div className="work-subtitle">
								Full Stack Web Developer
							</div>
							<div className="work-duration">Feb 2022 - Jul 2022 </div>
						</div>
						<div className="work">
							<img
								src="./work.png"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">API TECH PVT LTD</div>
							<div className="work-subtitle">
								Front End Web Developer
							</div>
							<div className="work-duration">Feb 2020 - Jan 2022 </div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
