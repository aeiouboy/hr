'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Building, Users, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocations, type LocationNode } from '@/hooks/use-locations';

function LocationTreeNode({ node, depth = 0, selectedId, onSelect }: { node: LocationNode; depth?: number; selectedId: string | null; onSelect: (node: LocationNode) => void }) {
 const [expanded, setExpanded] = useState(depth < 1);
 const hasChildren = node.children.length > 0;

 return (
 <div>
 <div
 className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition hover:bg-surface-raised hover:bg-surface-raised ${
 selectedId === node.id ?'bg-brand/10 text-brand' :''
 }`}
 style={{ paddingLeft: `${depth * 20 + 12}px` }}
 onClick={() => onSelect(node)}
 >
 {hasChildren ? (
 <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} className="p-0.5">
 {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
 </button>
 ) : (
 <span className="w-5" />
 )}
 <MapPin className="h-4 w-4 text-ink-muted flex-shrink-0" />
 <span className="text-sm font-medium truncate">{node.nameEn}</span>
 <Badge variant="neutral" className="ml-auto text-[10px]">{node.type}</Badge>
 <span className="text-xs text-ink-muted">{node.headcount}</span>
 </div>
 {expanded && hasChildren && (
 <div>
 {node.children.map((child) => (
 <LocationTreeNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
 ))}
 </div>
 )}
 </div>
 );
}

export function LocationPage() {
 const t = useTranslations('location');
 const { locations, loading, selectedLocation, setSelectedLocation, totalHeadcount, totalLocations, totalBranches } = useLocations();

 if (loading) {
 return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
 }

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Users className="h-8 w-8 text-brand" /><div><p className="text-2xl font-bold">{totalHeadcount.toLocaleString()}</p><p className="text-xs text-ink-muted">{t('totalHeadcount')}</p></div></CardContent></Card>
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><MapPin className="h-8 w-8 text-blue-500" /><div><p className="text-2xl font-bold">{totalLocations}</p><p className="text-xs text-ink-muted">{t('totalLocations')}</p></div></CardContent></Card>
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Building className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{totalBranches}</p><p className="text-xs text-ink-muted">{t('totalBranches')}</p></div></CardContent></Card>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Tree view */}
 <Card className="lg:col-span-1">
 <CardHeader><CardTitle>{t('locationTree')}</CardTitle></CardHeader>
 <CardContent className="p-2 max-h-[600px] overflow-y-auto">
 {locations.map((loc) => (
 <LocationTreeNode key={loc.id} node={loc} selectedId={selectedLocation?.id || null} onSelect={setSelectedLocation} />
 ))}
 </CardContent>
 </Card>

 {/* Detail view */}
 <Card className="lg:col-span-2">
 <CardHeader><CardTitle>{selectedLocation ? selectedLocation.nameEn : t('selectLocation')}</CardTitle></CardHeader>
 <CardContent>
 {!selectedLocation ? (
 <p className="text-sm text-ink-muted text-center py-12">{t('selectLocation')}</p>
 ) : (
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4 text-sm">
 <div><span className="text-ink-muted">Code</span><p className="font-medium">{selectedLocation.code}</p></div>
 <div><span className="text-ink-muted">{t('locationType')}</span><p className="font-medium">{selectedLocation.type}</p></div>
 <div><span className="text-ink-muted">{t('headcount')}</span><p className="font-medium">{selectedLocation.headcount} {t('employees')}</p></div>
 <div><span className="text-ink-muted">Status</span><Badge variant={selectedLocation.status ==='active' ?'success' :'neutral'}>{t(`status${selectedLocation.status ==='active' ?'Active' :'Inactive'}` as never)}</Badge></div>
 </div>
 {selectedLocation.address && (
 <div className="text-sm">
 <span className="text-ink-muted">{t('address')}</span>
 <p className="font-medium">{selectedLocation.address}</p>
 </div>
 )}
 {selectedLocation.children.length > 0 && (
 <div>
 <h4 className="text-sm font-semibold text-ink-soft mb-2">{t('childLocations')} ({selectedLocation.children.length})</h4>
 <div className="space-y-2">
 {selectedLocation.children.map((child) => (
 <div key={child.id} className="flex items-center justify-between p-3 bg-surface-raised rounded-md cursor-pointer hover:bg-surface-raised hover:bg-surface-raised" onClick={() => setSelectedLocation(child)}>
 <div className="flex items-center gap-2">
 <MapPin className="h-4 w-4 text-ink-muted" />
 <span className="text-sm font-medium">{child.nameEn}</span>
 </div>
 <div className="flex items-center gap-2">
 <Badge variant="neutral">{child.type}</Badge>
 <span className="text-xs text-ink-muted">{child.headcount}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Map placeholder */}
 <div className="bg-surface-raised rounded-md p-8 text-center">
 <MapPin className="h-8 w-8 text-ink-muted mx-auto mb-2" />
 <p className="text-sm text-ink-muted">{t('viewOnMap')}</p>
 </div>
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 </>
 );
}
