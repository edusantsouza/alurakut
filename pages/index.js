import React from'react';
import MainGrid from '../src/components/MainGrid/index';
import Box from '../src/components/Box/index';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/components/lib/index';
import {ProfileRelationsBoxWrapper} from '../src/components/profileRelations/index'


function ProfileSideBar (propriedades) {
  return (
  <Box>
  <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}} />

  <p>
    <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
    @{propriedades.githubUser}
    </a>
  </p>
  
  <hr />

  <AlurakutProfileSidebarMenuDefault />
  </Box>
  )
}

function ProfileRelationsBox (propriedades) {
  return ( 
<ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {propriedades.title} ({propriedades.items.length})
          </h2>
      {/* <ul>
        {friendGit.map((itemAtual) => {
        return (
          <li key={itemAtual}>
            <a href={`/users/${itemAtual}`} >
              <img src={`https://github.com/${itemAtual}.png`}/>
              <span>{itemAtual}</span>
            </a>
          </li>
       )
      })}
      </ul> */}
        </ProfileRelationsBoxWrapper>

  )}



export default function Home() {
  
  const githubUser = 'edusantsouza';
  
  const amigosFav = [
    'juunegreiros', 
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];
  const [friendGit, setFriendGit] = React.useState([])
  
  React.useEffect(function(){
    fetch(`https://api.github.com/users/peas/followers`)
    .then(function(respostaDoServer) {
          return respostaDoServer.json()
    })
    .then(function(respostaFinal){
      setFriendGit (respostaFinal)
    });

    //API GraphQL

    fetch('https://graphql.datocms.com/', {
      method: 'POST', 
      headers: {
    'Authorization' : 'd25d6380f22a39681f3ab9865be62b',
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
  },
      body: JSON.stringify({"query" : `query {
          title {
            comunity
            image
            id
          }
        }`})
  })
    .then ((response) => response.json())
    .then((completo) => {
      const comunidadesDato = completo.data.title;
      setComunidade(comunidadesDato);  
      console.log(comunidadesDato);
        
       })
    

  }, []) 
  const [comunidade, setComunidade] = React.useState([]);
 

  
  
  return (
  <>
    <AlurakutMenu  />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
       <ProfileSideBar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea"style={{ gridArea: 'welcomeArea' }}>
        <Box as="aside">
          <h1  className="title">
            Bem-vindo(a)
          </h1>
          <OrkutNostalgicIconSet/> 
        </Box>
        <Box> 
          <h2>O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e) {
            e.preventDefault();


            const dadosDoForm = new FormData(e.target);


            const newComunidades = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),

            }
            const comunidadesAtualizadas = [...comunidade, newComunidades];
            setComunidade(comunidadesAtualizadas)

          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>

            <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>

            
            <div>
              <input
                placeholder="URL de destino"
                name="site"
                aria-label="URL de destino"
              />
            </div>

            <button>
              Criar Comunidade
            </button>
          </form>      
        </Box>
        
      </div>
      
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
      
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Amigos ({amigosFav.length})
          </h2>
      <ul>
        {amigosFav.map((itemAtual) => {
        return (
          <li key={itemAtual}>
            <a href={`/users/${itemAtual}`} >
              <img src={`https://github.com/${itemAtual}.png`}/>
              <span>{itemAtual}</span>
            </a>
          </li>
       )
      })}
      </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>

      <h2 className="smallTitle">
        Comunidades ({comunidade.length})
      </h2>
      {/* {<ul>
        {comunidade.map((itemAtual) => {
        return (
          <li>
            <a href={`/comunidades/${itemAtual.id}`}>
              <img src={itemAtual.image}/>
              <span>{itemAtual.comunity}</span>
            </a>
          </li>
       )
      })}
      </ul>} */}
      </ProfileRelationsBoxWrapper>
      <ProfileRelationsBox title="Seguidores" items={friendGit} />
      </div>
    </MainGrid>
    </>
  )
    }
