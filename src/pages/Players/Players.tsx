import { useState, useMemo, useCallback } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { Tabs, TabPanels } from '../../components/ui/Tabs';
import { PlayerHeadWithName } from '../../components/ui/PlayerHead';
import { RankBadge } from '../../lib/rankColors';
import { usePlayers } from '../../hooks/useServerStatus';
import { formatPlaytime, formatTimestamp, getRankColor } from '../../lib/utils';
import styles from './Players.module.css';

const TABS = [
  { id: 'online', label: 'Online' },
  { id: 'all', label: 'All Players' },
] as const;

type TabId = typeof TABS[number]['id'];

const RANK_FILTERS = ['default', 'sprout', 'baked', 'golden', 'legendary', 'staff', 'admin'] as const;

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'rank', label: 'Rank' },
  { value: 'playtime', label: 'Playtime' },
  { value: 'lastSeen', label: 'Last Seen' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];

const ITEMS_PER_PAGE = 20;

export const Players = () => {
  const { data: playersData, isLoading, isError, error } = usePlayers();
  const [activeTab, setActiveTab] = useState<TabId>('online');
  const [search, setSearch] = useState('');
  const [rankFilter, setRankFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const filteredPlayers = useMemo(() => {
    if (!playersData) return [];

    let result = playersData.filter((p) => {
      if (activeTab === 'online' && !p.online) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (rankFilter !== 'all' && p.rank !== rankFilter) return false;
      return true;
    });

    result.sort((a, b) => {
      let aVal: string | number = a[sortBy];
      let bVal: string | number = b[sortBy];

      if (sortBy === 'name') {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      } else if (sortBy === 'rank') {
        const rankOrder = { default: 0, sprout: 1, baked: 2, golden: 3, legendary: 4, staff: 5, admin: 6 };
        aVal = rankOrder[aVal as keyof typeof rankOrder] || 0;
        bVal = rankOrder[bVal as keyof typeof rankOrder] || 0;
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [playersData, activeTab, search, rankFilter, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE));
  const paginatedPlayers = filteredPlayers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSort = useCallback((value: SortOption) => {
    setSortBy(value);
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Players</h1>
          <p className={styles.subtitle}>Browse our community members</p>
        </div>
        <div className={styles.loading}>
          <LoadingSpinner />
          <p>Loading players...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Players</h1>
        </div>
        <Panel variant="outlined" className={styles.errorPanel}>
          <ErrorIcon />
          <h2>Failed to load players</h2>
          <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
          <MCButton variant="primary" onClick={() => window.location.reload()}>
            Retry
          </MCButton>
        </Panel>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Players</h1>
          <p className={styles.subtitle}>
            {playersData?.length || 0} registered • {playersData?.filter(p => p.online).length || 0} online
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <Panel variant="default" className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchWrapper}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search players..."
              value={search}
              onChange={handleSearchChange}
              className={styles.searchInput}
              aria-label="Search players"
            />
          </div>
          <Tabs
            tabs={TABS.map(t => ({ ...t, count: t.id === 'online' ? playersData?.filter(p => p.online).length : playersData?.length }))}
            activeTab={activeTab}
            onChange={(tabId: string) => setActiveTab(tabId as TabId)}
            variant="pills"
          />
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.filterGroup}>
            <label htmlFor="rank-filter" className={styles.filterLabel}>Rank</label>
            <select
              id="rank-filter"
              value={rankFilter}
              onChange={(e) => { setRankFilter(e.target.value); setPage(1); }}
              className={styles.filterSelect}
            >
              <option value="all">All Ranks</option>
              {RANK_FILTERS.map(r => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="sort-by" className={styles.filterLabel}>Sort</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as SortOption)}
              className={styles.filterSelect}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
              className={clsx(styles.sortDirBtn, sortDir === 'desc' && styles.desc)}
              aria-label={sortDir === 'asc' ? 'Sort descending' : 'Sort ascending'}
              title={sortDir === 'asc' ? 'Ascending' : 'Descending'}
            >
              <SortIcon />
            </button>
          </div>
        </div>
      </Panel>

      {/* Player Grid */}
      <div className={styles.grid}>
        {paginatedPlayers.length > 0 ? (
          paginatedPlayers.map((player) => (
            <Link key={player.uuid} to={`/players/${player.name}`} className={styles.playerCard}>
              <div className={styles.playerHead}>
                <PlayerHeadWithName
                  username={player.name}
                  uuid={player.uuid}
                  size="md"
                  showName={false}
                />
                {player.online && <span className={styles.onlineIndicator} aria-label="Online" />}
              </div>
              <div className={styles.playerInfo}>
                <div className={styles.playerNameRow}>
                  <span className={styles.playerName}>{player.name}</span>
                  <RankBadge rankId={player.rank} size="sm" />
                </div>
                <div className={styles.playerMeta}>
                  <span>{formatPlaytime(player.playtime)}</span>
                  {player.lastSeen && (
                    <span className={clsx(styles.lastSeen, player.online && styles.online)}>
                      {player.online ? 'Online now' : `Last seen ${formatTimestamp(player.lastSeen)}`}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.emptyState}>
            <PlayerIcon />
            <h3>No players found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Player pages">
          <MCButton
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </MCButton>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
              .map((p, i, arr) => (
                <React.Fragment key={p}>
                  {i > 0 && p - arr[i - 1] > 1 && <span className={styles.ellipsis}>…</span>}
                  <button
                    className={clsx(styles.pageBtn, p === page && styles.active)}
                    onClick={() => handlePageChange(p)}
                    aria-label={p === page ? `Page ${p}, current` : `Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
          </div>
          <MCButton
            variant="secondary"
            size="sm"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </MCButton>
        </nav>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.errorIcon}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.searchIcon}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const SortIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.sortIcon}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const PlayerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.emptyIcon}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);