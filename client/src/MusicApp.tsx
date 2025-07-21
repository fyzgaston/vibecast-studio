import { Routes, Route, Navigate } from 'react-router-dom';
import MusicPage from '@/pages/MusicPage';
import AuthPage from '@/pages/AuthPage';
import ProtectedRoute from '@/shared/routing/ProtectedRoute';
import TrackList from '@/components/TrackList';
import { SearchProvider } from '@/shared/lib/SearchContext';

function MusicApp() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthPage/>}/>
      {/*ниже роут для редиректа*/}
      <Route path='/' element={<Navigate to='/tracks' replace />} />
      <Route
      path='/*'
      element={
        <ProtectedRoute>
          <SearchProvider>
            <MusicPage />
          </SearchProvider>

        </ProtectedRoute>
      }
      >
        <Route index element={<Navigate to='/tracks' replace />} />
        <Route path='tracks' element={<TrackList mode='all' />} />
        <Route path='favorites' element={<TrackList mode='favorites' />} />
      </Route>
    </Routes>
  );
}

export default MusicApp;