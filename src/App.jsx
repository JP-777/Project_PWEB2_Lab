import './App.css'
import { FriendBar } from './components/FriendBar.jsx';
import { NavBar } from './components/NavBar.jsx'
import { PostingPanel } from './components/PostingPanel.jsx'

export function App() {
    const userName = 'JP-777';

    const testPost = [
        {
            id: 1,
            userName: "Saul Andre Sivincha Machaca",
        },

        {
            id: 2,
            userName: "Matias Dario Davila Flores"
        },
        {
            id: 3,
            userName: "Jefferson Joao Basurco Cassani"
        }
    ]

    return (
        <div className="App">
            <nav>
                <NavBar
                    selfProfilePhoto={`https://unavatar.io/${userName}`}
                    selfProfileName={userName}
                />
            </nav>

            <div className='principalBody'>
                <FriendBar />
                <PostingPanel content={testPost} />
            </div>
        </div>
    )
}
