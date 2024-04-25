import React from 'react'
import {AiOutlineSearch,AiOutlineClose} from 'react-icons/ai'
import {TiMicrophone} from 'react-icons/ti'
import {BsYoutube,BsCameraVideo,BsBell} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoAppsSharp} from 'react-icons/io5'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {useAppDispatch,useAppSelector} from '../store/hook'
import {changeSearchTerm, clearSearchTerm, clearVideo} from '../store'
import getSearchPageVideos from '../store/reducers/getSearchPageVideos'

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state)=>state.youtubeApp.searchTerm);
    const handleSearch = ()=>{
        if(location.pathname !=="/search")navigate("/search");
        else {
            dispatch(clearVideo());
            dispatch(getSearchPageVideos(false));
        }
    }
  return (
  <div className="flex justify-between item-center px-14 h-14 bg-[#212121] opacity-95 sticky z-50  top-0">
    <div className="flex items-center gap-8 text-2xl">
        <div>
            <GiHamburgerMenu/>
        </div>
        <Link to={'/'}>
            <div className="flex gap-1 items-center justify-center">
                <BsYoutube className='text-3xl text-red-600'/>
                <span className='text-xl font-medium pb-1'>YouTube</span>
            </div>
        </Link>
    </div>
    <div className="flex items-center justify-center gap-5">
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSearch();
        }}>
            <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
                <div className="flex gap-4 pr-4 items-center">
                    <div>
                        <AiOutlineSearch/>
                    </div>
                    <input type="text" className='w-96 bg-zinc-900 focus:outline border-none'
                        value={searchTerm}
                        onChange={(e)=>dispatch(changeSearchTerm(e.target.value))}
                    />
                    <AiOutlineClose 
                    className={`text-xl cursor-pointer ${!searchTerm ? "invisible":"visible"}`}
                    onClick={()=>dispatch(clearSearchTerm())}
                    />
                </div>
                <button className='h-10 w-16 flex items-center justify-center bg-zinc-800'>
                        <AiOutlineSearch className='text-xl'/>
                </button>
            </div>
        </form>
        <div className="text-xl rounded-full p-3 bg-zinc-900">
            <TiMicrophone/>
        </div>
    </div>
    <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo/>
        <IoAppsSharp/>
        <div className="relative">
            <BsBell/>
            <span className='absolute text-xs bottom-2 bg-red-600 left-2 rounded-full px-1'>9+</span>
        </div>
        <img src="https://yt3.googleusercontent.com/ytc/AIf8zZSoiOS8sxP0fIRe0GGUBWpUCPwwdX1cYpqKZ04-_5285ytrIp_ShEeZ8zAZ3zZZ=s176-c-k-c0x00ffffff-no-rj" alt="logo" className='w-9 h-9 rounded-full' />
    </div>
  </div>
  )
}
