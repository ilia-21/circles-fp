const Cookies = () => {
	return (
		<div className="content-section">
			<h1>Enabling cross-site cookies</h1>
			<h3>Firefox</h3>
			<p>Click on the shield Icon in address bar</p>
			<p>Untick "Enchanced Tracking Protection"</p>
			<img src="https://ilia21.s-ul.eu/Bzitpv9v" alt="" />
			<h3>Chrome</h3>
			<p>Click on the eye Icon in right side of the address bar</p>
			<p>Enable "Third-party cookies"</p>
			<img src="https://ilia21.s-ul.eu/XqPjQKab" alt="" />
			<h3>Edge</h3>
			<p>Click on the lock Icon in left side of the address bar</p>
			<p>Disable "tracking prevention for this website"</p>
			<img src="https://ilia21.s-ul.eu/Xdyc7LR5" alt="" />
			<h3>Safari</h3>
			<p>
				Don't have money for iphone, please <a href="https://www.google.com/search?q=enable+cross+site+cookies+safari">Google it</a>, <a href="https://duckduckgo.com/?q=enable+cross+site+cookies+safari">Search on duck duck go</a> or <a href="https://search.brave.com/search?q=enable+cross+site+cookies+safari">search in brave</a> yourself.
			</p>
			<h2>Why</h2>
			<p>If you still have questions, I'll explain how the system works in this section, and link materials so you can check it yourself</p>
			<p>After you click login, you go to the API, which redirects you to the osu! website. An API is basically a layer between the website and the database. In this case, I use the API to handle sessions and authorization. In simple terms, a session is your presence on the website. For example, your osu! website session is a confirmation that you, as a user, are logged in. After you log in on the osu! website, you are redirected back to the API, with confirmation from the osu! website. Think of it like a signed paper. The osu! website gives you a signed paper and returns you back to the API, where you show it. After the API sees your paper, it creates a session with the information from the osu! website, and you're good to go.</p>
			<p>In a typical setup, the API and the website are on the same server. However, as I mentioned, I use separate servers to cut costs since this website doesn't generate any income for me. When your browser notices you're carrying a paper from one server to another, it gets suspicious and removes this paper. Why? Simply because this paper could potentially be used to share your personal information with advertisers. You may not even notice, but usually, visiting a website sends a lot of these "papers" to different websites, often without asking for your permission. This is why some browsers block cross-site cookies by default, as a privacy measure.</p>
			<a href="https://stackoverflow.com/questions/11142882/what-are-cookies-and-sessions-and-how-do-they-relate-to-each-other">What are cookies and sessions, and how do they relate to each other?</a>
			<br />
			<a href="https://en.wikipedia.org/wiki/Session_(computer_science)">Session (computer science)</a>
			<br />
			<a href="https://en.wikipedia.org/wiki/HTTP_cookie">HTTP cookie</a>
			<p>- ilia21</p>
		</div>
	);
};

export default Cookies;
