import { useEffect, useState } from "react";
import styled from "styled-components";
import DisneyCharacters from "./components/DisneyCharacters.tsx";
import type { Character } from "./interfaces/Characters.ts";

//tsconfig.app.json turns on verbatimModuleSyntax so type only imports have to say "import type"
//https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax

const lastPage = 197;

const ParentDiv = styled.div`
    width: 88vw;
    max-width: 1150px;
    margin: 0 auto;
    padding: 3vh 0;
`;

const TitleBar = styled.header`
    background-color: #000000;
    padding: 2vh 3%;
    margin-bottom: 3vh;
`;

const Title = styled.h1`
    font-family: "Poppins", Arial, sans-serif;
    font-size: calc(18px + 1.4vw);
    letter-spacing: 1px;
    color: #FDF5F4;
`;

const SubTitle = styled.p`
    font-size: calc(10px + 0.4vw);
    color: #E6D4D1;
    margin-top: 1vh;
`;

const PageLabel = styled.label`
    display: block;
    margin-bottom: 1vh;
    font-family: "Poppins", Arial, sans-serif;
    font-size: calc(10px + 0.4vw);
    color: black
`;

const PageInput = styled.input`
    width: 25%;
    margin-bottom: 3vh;
    padding: 1vh;
    background-color: #FFFFFF;
    border: 3px solid #000000;
    color: black;
    font-family: "Inter", Arial, sans-serif;
    font-size: calc(10px + 0.4vw);
    text-align: center;
`;

//i couldnt find hooks in lec 1-6, using them cause mp-2 task-1 point 1 says the app component handles the api with hooks
export default function App() {
    const [page, setPage] = useState(1);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [message, setMessage] = useState("get excited: ");

    useEffect(() => {
        async function fetchCharacters(): Promise<void> {
            const rawData = await fetch(
                `https://api.disneyapi.dev/character?page=${page}&pageSize=12`
            );

            //lec-4 p13, check .status first so a bad response doesnt break the map in the child
            if (rawData.status > 299) {
                setCharacters([]);
                setMessage(`disney api responded with code ${rawData.status}.`);
                return;
            }

            const { data }: { data: Character[] } = await rawData.json();
            setCharacters(data);
            setMessage(data.length === 0 ? "no characters on this page :(" : "");
        }

        fetchCharacters()
            .then(() => console.log("yay"))
            .catch((e: Error) => {
                console.log("error: " + e);
                setCharacters([]);
                setMessage("couldnt reach disney API");
            });
    }, [page]);

    function changePage(value: string): void {
        const wanted = Number(value);

        if (wanted >= 1 && wanted <= lastPage) {
            setPage(wanted);
        }
    }

    return (
        <ParentDiv>
            <TitleBar>
                <Title>disney character explorer!</Title>
                <SubTitle>
                    all the characters films show games and park attractions from disney api :D
                </SubTitle>
            </TitleBar>

            {/*lec-3 p30, every input needs a label whose for matches the input id, and lec-5 p32 says tsx writes for as htmlFor*/}
            <PageLabel htmlFor="page-number">page number (1 - {lastPage})</PageLabel>
            <PageInput
                id="page-number"
                type="number"
                value={page}
                min={1}
                max={lastPage}
                onChange={(e) => changePage(e.target.value)}
            />

            <DisneyCharacters characters={characters} message={message} />
        </ParentDiv>
    );
}
