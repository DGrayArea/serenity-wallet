import ExploreNews from './explore/ExploreNews';
import ExploreSites from './explore/ExploreSites';
import ExploreTokens from './explore/ExploreTokens';
import ExploreCollections from './explore/ExploreCollections';
import theme from '@/config/theme';

type TabType = 'sites' | 'news' | 'tokens' | 'collections';

interface ExploreContentProps {
  activeTab: TabType;
}

const ExploreContent = ({ activeTab }: ExploreContentProps) => {
  return (
    <div /* className="w-full max-w-2xl mx-auto px-5 py-6" */ style={{ width: theme.rootWidth, padding: "4px" }}>
      {activeTab === 'sites' && <ExploreSites />}

      {activeTab === 'news' && <ExploreNews />}

      {activeTab === 'tokens' && <ExploreTokens />}

      {activeTab === 'collections' && <ExploreCollections />}
    </div>
  );
};

export default ExploreContent; 