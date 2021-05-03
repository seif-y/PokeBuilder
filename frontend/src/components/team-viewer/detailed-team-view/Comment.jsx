import Body from "../util/style-components/Body";
import Headline from "../util/style-components/Headline";
import UpvotableContent from "../util/upvotes/UpvotableContent";

// todo time posted
export default function Comment({ body, poster, upvotes }) {
    return (
        <UpvotableContent upvotes={upvotes}>
            <Headline>{poster}</Headline>
            <Body>{body}</Body>
        </UpvotableContent>
    );
}
