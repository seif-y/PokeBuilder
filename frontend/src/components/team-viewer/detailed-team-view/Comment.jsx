import Body from "../util/style-components/Body";
import Headline from "../util/style-components/Headline";
import ShadowedBox from "../util/style-components/ShadowedBox";

// todo time posted
export default function Comment({ body, username }) {
    return (
        <ShadowedBox>
            <Headline>{username}</Headline>
            <Body>{body}</Body>
        </ShadowedBox>
    );
}
