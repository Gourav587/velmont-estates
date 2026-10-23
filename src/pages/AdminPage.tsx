import { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import type { Project } from '../types/project';
import { categories, formatPrice } from '../types/project';
import { parseProject } from '../lib/projectValidation';
import ProjectStatus from '../components/ProjectStatus';

type Draft = Omit<Project, 'id'>;
const empty: Draft = { title: '', location: '', category: 'Residential', image: '', description: '', price: null, area: '', bedrooms: null, status: 'Enquire for availability', rera: '', gallery: [], isIllustrative: false };
export default function AdminPage() {
  const { projects, loading, error: loadError, addProject, updateProject, deleteProject } = useProjects();
  const [draft, setDraft] = useState<Draft>(empty);
  const [gallery, setGallery] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const results = projects.filter(project => `${project.title} ${project.location}`.toLowerCase().includes(search.toLowerCase()) && (!category || project.category === category));
  function edit(project?: Project) {
    setDraft(project ? { ...empty, ...project } : { ...empty });
    setGallery(project?.gallery?.join('\n') || '');
    setEditing(project?.id || null); setOpen(true); setError(''); setNotice('');
  }
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const data = parseProject({ ...draft, gallery: gallery.split('\n').map(url => url.trim()).filter(Boolean) });
      if (editing) await updateProject(editing, data); else await addProject(data);
      setOpen(false); setNotice('Property saved. The listing is now shared with visitors.');
    } catch (error) { setError(error instanceof Error ? error.message : 'Unable to save this listing.'); }
    finally { setBusy(false); }
  }
  async function remove(id: string) {
    setBusy(true); setError(''); setNotice('');
    try { await deleteProject(id); setDeleting(null); setNotice('Property removed.'); }
    catch (error) { setError(error instanceof Error ? error.message : 'Unable to delete this listing.'); }
    finally { setBusy(false); }
  }
  function field(key: keyof Draft, value: unknown) { setDraft(current => ({ ...current, [key]: value })); }
  return <section className="container section admin-page">
    <header className="results-heading"><div><p className="eyebrow">Listing management</p><h1>Your portfolio</h1><p>{projects.length} properties in the shared portfolio</p></div><button className="btn btn-primary" disabled={busy} onClick={() => edit()}><Plus size={18} /> New property</button></header>
    <p className="photo-note">Publish verified details and photos only. Mark sample listings as illustrative until they are verified.</p>
    {error && <p className="error-message" role="alert">{error}</p>}{notice && <p className="notice" role="status">{notice}</p>}
    {open && <section className="admin-editor"><div className="results-heading"><h2>{editing ? 'Edit property' : 'New property'}</h2><button type="button" disabled={busy} className="icon-button" aria-label="Close property editor" onClick={() => setOpen(false)}><X /></button></div><form onSubmit={save} className="stack"><fieldset disabled={busy} className="editor-fields">
      <label>Property title<input autoFocus required maxLength={160} className="form-input" value={draft.title} onChange={event => field('title', event.target.value)} /></label>
      <label>Location<input required maxLength={250} className="form-input" value={draft.location} onChange={event => field('location', event.target.value)} /></label>
      <label>Property type<select className="form-input" value={draft.category} onChange={event => field('category', event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
      <label>Price in rupees (optional)<input type="number" min={0} max={2147483647} step={1} className="form-input" value={draft.price ?? ''} onChange={event => field('price', event.target.value === '' ? null : Number(event.target.value))} /></label>
      <label>Area, including unit<input placeholder="e.g. 1,800 sq ft" maxLength={100} className="form-input" value={draft.area} onChange={event => field('area', event.target.value)} /></label>
      <label>Bedrooms (optional)<input type="number" min={0} max={100} step={1} className="form-input" value={draft.bedrooms ?? ''} onChange={event => field('bedrooms', event.target.value === '' ? null : Number(event.target.value))} /></label>
      <label>Availability<input maxLength={100} className="form-input" value={draft.status} onChange={event => field('status', event.target.value)} /></label>
      <label>RERA registration / applicability<input maxLength={250} className="form-input" value={draft.rera} onChange={event => field('rera', event.target.value)} /></label>
      <label className="full-width">Cover photo URL<input type="url" required placeholder="https://…" maxLength={2000} className="form-input" value={draft.image} onChange={event => field('image', event.target.value)} /></label>
      <label className="full-width">Gallery photo URLs (one per line, up to 8)<textarea rows={4} className="form-input" value={gallery} onChange={event => setGallery(event.target.value)} /></label>
      <label className="full-width">Description<textarea rows={5} maxLength={4000} className="form-input" value={draft.description} onChange={event => field('description', event.target.value)} /></label>
      <label className="checkbox-label full-width"><input type="checkbox" checked={draft.isIllustrative} onChange={event => field('isIllustrative', event.target.checked)} /> Illustrative listing / stock photography</label>
    </fieldset><div className="button-row"><button className="btn btn-primary" disabled={busy}>{busy ? 'Saving…' : 'Save property'}</button><button type="button" disabled={busy} className="btn btn-outline" onClick={() => setOpen(false)}>Discard changes</button></div></form></section>}
    <div className="property-filters admin-filters"><label>Search<input type="search" className="form-input" value={search} onChange={event => setSearch(event.target.value)} placeholder="Title or location" /></label><label>Property type<select className="form-input" value={category} onChange={event => setCategory(event.target.value)}><option value="">All types</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <ProjectStatus />
    {!loading && !loadError && <div className="property-grid">{results.map(project => <article className="admin-card" key={project.id}><img src={project.image} alt={project.title} loading="lazy" width={600} height={400} /><div className="stack"><p className="eyebrow">{project.category}</p><h2>{project.title}</h2><p>{project.location}</p><p>{formatPrice(project.price)}</p><div className="button-row"><button className="btn btn-outline" disabled={busy} onClick={() => edit(project)}><Pencil size={16} /> Edit</button><button className="btn btn-outline" disabled={busy} onClick={() => setDeleting(project.id)}><Trash2 size={16} /> Delete</button></div>{deleting === project.id && <div className="delete-confirmation" role="group" aria-label={`Confirm deletion of ${project.title}`}><p>Remove this property permanently?</p><div className="button-row"><button className="btn btn-danger" disabled={busy} onClick={() => void remove(project.id)}>{busy ? 'Removing…' : 'Confirm delete'}</button><button className="btn btn-outline" disabled={busy} onClick={() => setDeleting(null)}>Cancel</button></div></div>}</div></article>)}{!results.length && <div className="empty-state"><h2>No properties found</h2><p>Add a property or adjust your search.</p></div>}</div>}
  </section>;
}
