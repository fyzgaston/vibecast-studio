import './MusicPage.scss'
import MainContent from '../../layouts/MainContent';
import TrackList from '@/components/TrackList';
import Sidebar from '@/layouts/Sidebar';
import {Routes, Route} from 'react-router-dom';
import AudioPlayer from '@/components/AudioPlayer';
import { TrackProvider } from '@/shared/lib/TrackContext';
import {Navigate} from 'react-router-dom';

const MusicPage = () => {
  return (
    <TrackProvider>
      <div className="music-page">
        <div className="music-page__body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainContent />}>
              <Route index element={<Navigate to="tracks" replace />} />
              <Route path="tracks" element={<TrackList mode="all" />} />
              <Route path="favorites" element={<TrackList mode="favorites" />} />
            </Route>
          </Routes>
        </div>
        <AudioPlayer />
      </div>
    </TrackProvider>
  )
}

export default MusicPage;