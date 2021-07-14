import MainGrid from '../src/components/MainGrid/index';
import Box from '../src/components/Box/index';
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/components/lib/index';
import {ProfileRelationsBoxWrapper} from '../src/components/profileRelations/index'


function ProfileSideBar (propriedades) {
  return (
  <Box>
  <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}} />
  </Box>
  )
}


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

  return (
  <>
    <AlurakutMenu  />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
       <ProfileSideBar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea"style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1  className="title">
            Bem-vindo(a)
          </h1>
          <OrkutNostalgicIconSet/>
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
          <li>
            <a href={`/users/${itemAtual}`} key={itemAtual}>
              <img src={`https://github.com/${itemAtual}.png`}/>
              <span>{itemAtual}</span>
            </a>
          </li>
       )
      })}
      </ul>
        </ProfileRelationsBoxWrapper>

        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
