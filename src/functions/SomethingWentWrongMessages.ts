const messages: string[] = [
    "You ended up in a strage place",
    "You shitmiseed",
    "Looks like the servers are taking break",
    "Looks like a hidden mod is enabled on this page",
    "You got a slider break",
    "Uh-oh! This page seems to have slipped into the graveyard",
    "Page not found... just like accuracy on your top play!",
    "Can't find the storyboard for this page. Looks like someone disabled it!",
    "404: Not Found. Looks like you're hunting for a hidden object. Keep searching!",
    "Error 403: Forbidden. Looks like you're not ready for this difficulty. Practice some more!",
    "The page you're searching for is probably practicing pool right now",
    "Error 406: You have overstreamed 222 bpm "
];
const randomErrorMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)];
};
export default randomErrorMessage;
