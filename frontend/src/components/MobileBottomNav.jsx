import SaveButton from './SaveButton';
import DownloadButton from './DownloadButton';

const MobileBottomNav = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col space-y-2">
          <SaveButton className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200" />
          <DownloadButton className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
