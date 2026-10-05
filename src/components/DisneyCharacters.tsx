import styled from "styled-components";
import CharacterCard from "./CharacterCard.tsx";
import type { Character } from "../interfaces/Characters.ts";

const AllCharsDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`;

const Message = styled.p`
    padding: 4vh 0;
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    font-size: calc(12px + 0.5vw);
    color: black;
`;

export default function DisneyCharacters(props: {
    characters: Character[];
    message: string;
}) {
    return (
        <AllCharsDiv>
            {props.message !== "" ? (
                <Message>{props.message}</Message>
            ) : (
                props.characters.map((char: Character) => (
                    <CharacterCard key={char._id} character={char} />
                ))
            )}
        </AllCharsDiv>
    );
}
