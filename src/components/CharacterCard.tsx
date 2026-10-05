import styled from "styled-components";
import type { Character } from "../interfaces/Characters.ts";

const SingleCharDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: #EBF7F7;
    border: 5px solid #000000;

    /*lec-2 media query, otherwise 30% is way too skinny on a phone*/
    @media screen and (max-width: 750px) {
        max-width: 100%;
    }
`;

const CharImage = styled.img`
    width: 100%;
    border: 3px solid #000000;
`;

const NoImage = styled.div`
    width: 100%;
    padding: 22% 2%;
    text-align: center;
    background-color: #FDF5F4;
    border: 3px dashed #000000;
    color: black;
    font-family: "Poppins", Arial, sans-serif;
    font-size: calc(10px + 0.4vw);
`;

const CharName = styled.h2`
    margin-top: 1.5vh;
    font-family: "Poppins", Arial, sans-serif;
    font-size: calc(11px + 0.5vw);
    color: black;
`;

const FilmLine = styled.p`
    margin-top: 0.8vh;
    font-size: calc(9px + 0.35vw);
    font-style: italic;
    color: gray;
`;

const StatList = styled.ul`
    list-style: none;
    margin-top: 1.5vh;
    font-size: calc(9px + 0.35vw);
`;

const Stat = styled.li`
    padding: 0.5vh 0;
    border-top: 2px solid #000000;
    color: black;
`;

export default function CharacterCard(props: { character: Character }) {
    const char = props.character;

    return (
        <SingleCharDiv>
            {char.imageUrl !== "" ? (
                <CharImage src={char.imageUrl} alt={`image of ${char.name}`} />
            ) : (
                <NoImage>no image available D:</NoImage>
            )}

            <CharName>{char.name}</CharName>

            <FilmLine>
                {char.films.length > 0 ? char.films[0] : "not in any films!"}
            </FilmLine>

            <StatList>
                <Stat>films: {char.films.length}</Stat>
                <Stat>tv shows: {char.tvShows.length}</Stat>
                <Stat>video games: {char.videoGames.length}</Stat>
                <Stat>park attractions: {char.parkAttractions.length}</Stat>
            </StatList>
        </SingleCharDiv>
    );
}
