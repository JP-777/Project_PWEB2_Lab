import '../styles/NavBar.css'
import logo from './icons/logo.svg'
import search from './icons/search.svg'
import bell from './icons/bell.svg'
import messages from './icons/messages.svg'
import friends from './icons/friends.svg'

// eslint-disable-next-line react/prop-types
export function NavBar( {selfProfilePhoto, selfProfileName}) {
  return (
    <div className="navBar">
      
      <img className="logo" alt="Logo" src={logo}/>
      
      <div className="searchContainer">
        <input autoComplete="off" className="searchInput" type="text" placeholder="Search..."/>
        <img className="searchIcon" src={search} alt="Search"/>
      </div>

      {/* ESTE ES EL NAVBAR HAY MUCHOS BOTONES COMO LOS DE ABAJO QUE AUN NO HE PUESTO EN FUNCION
          SI QUIERES COMPLTARLOS PARA DARLES ESTILOS O REDIRECCIONES SERIA GENIAL, POR AHORA SOLO LO DEJ EN ESTO
      */}

      <div className='navButtons'>
        <strong>
          <ul>
            <li>Home</li>
            <li>Search Friends</li>
            <li>Create</li>
          </ul>
        </strong>
      </div>

      <div className='navIcons'>
        <img src={friends}/>
        <img src={messages}/>
        <img src={bell}/>
      </div>

      <div className='selfProfile'>
        <img className='selfProfilePhoto' alt='Profile Photo' src={selfProfilePhoto}/>
        <strong>
          {selfProfileName} ▼
        </strong>
      </div>
    </div>
  );
}
