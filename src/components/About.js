import { Container } from "react-bootstrap"

const About = () => {
	return (
		<Container>
			<h1>About</h1>
			<h4>Version 1.0.0</h4>
			<p>
				This app was designed and written by{" "}
				<a
					href="https://twitter.com/jp_dixon99"
					target="_blank"
					rel="noreferrer"
				>
					JP Dixon
				</a>{" "}
				(Twitter) as a personal project. It is not affiliated with Wizards of
				the Coast and is not intended for commercial use. It falls under fair
				use under the{" "}
				<a
					href="https://dnd.wizards.com/resources/systems-reference-document"
					target="_blank"
					rel="noreferrer"
				>
					OpenGL
				</a>
				. All spell data is taken from{" "}
				<a href="https://www.dnd5eapi.co/" target="_blank" rel="noreferrer">
					dnd5eapi.co
				</a>
				, a free api database which contains all of the SRD spells. For spells
				that are not within the SRD, such as for homebrew spells from your
				campaign or from books you have bought, you can use the custom spell
				feature to add them to your spell list which are stored locally in your
				browser.
			</p>
			<p>
				I started the development of this web app because I started playing a
				DnD 5e campaign using only pen and paper, but found that the only
				annoying thing about it was keeping track of my prepared spells and
				their description. One solution I found was printing cards that
				contained all the information about the spells I wanted to use, but the
				cost would be a bit high if I wanted to get nice looking cards. What I
				ended up doing was using a website with all the spells of the class I
				was playing and opening each spell as needed. This was a bit annoying
				since the page I was using was rather slow and I had to load a new page
				for each spell, so I decided to combine these two solutions into one web
				app, so you can save the spells you want to use as card-like components
				and quickly be able to open and close them in a single page without
				having to load new tabs or pages. I hope you find it useful!
			</p>
			<h5>Future features</h5>
			<p>
				Currently, all of the data for the app is stored locally in your
				browser, that means that the characters you create and the custom spells
				you add can only be accessed by the browser you are using. In the
				future, I plan to add a log-in feature so that you can access your
				characters and custom spells from any device. I will probably be using
				MongoDB for this. I would also like to add a feature so that each user
				can have multiple characters, in case you are playing different
				characters in different campaigns. Because I wasn't entirely sure how
				other spell casting classes work, I decided only to make this app for
				the Cleric class, which is the class that I am currently using for a
				Wildermount campaign (a Tortle named Jojo). I plan to add the other
				classes in the future.
			</p>
		</Container>
	)
}

export default About
