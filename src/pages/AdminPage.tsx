import React, { useState, useMemo } from 'react';
import { useProjects, type Project } from '../context/ProjectContext';
import { Plus, Trash2, Edit2, Save, X, Search, Filter, LayoutGrid, Home, Building2, Landmark, CheckCircle2 } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    location: '',
    category: 'Residential',
    image: '',
    description: ''
  });

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: projects.length,
      residential: projects.filter(p => p.category === 'Residential').length,
      commercial: projects.filter(p => p.category === 'Commercial').length,
      plots: projects.filter(p => p.category === 'Luxury Plots').length,
      industrial: projects.filter(p => p.category === 'Industrial').length
    };
  }, [projects]);

  // Search and Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory === 'All' || project.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, filterCategory]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(formData);
    setFormData({ title: '', location: '', category: 'Residential', image: '', description: '' });
    setIsAdding(false);
  };

  const handleUpdate = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    updateProject(id, formData);
    setEditingId(null);
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      location: project.location,
      category: project.category,
      image: project.image,
      description: project.description || ''
    });
    setIsAdding(false);
  };

  const confirmDelete = (id: string) => {
    deleteProject(id);
    setDeleteId(null);
  };

  return (
    <div className="section" style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: '6rem' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Dashboard</h1>
            <p style={{ color: '#64748b' }}>Manage your real estate <span style={{ color: 'var(--accent)', fontWeight: 600 }}>portfolio</span></p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setFormData({ title: '', location: '', category: 'Residential', image: '', description: '' });
            }}
            style={{ padding: '0.75rem 1.5rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px' }}
          >
            <Plus size={20} /> New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '3rem' 
        }}>
          <StatCard icon={<LayoutGrid size={20} />} label="Total Projects" value={stats.total} color="#4f46e5" />
          <StatCard icon={<Home size={20} />} label="Residential" value={stats.residential} color="#ef4444" />
          <StatCard icon={<Building2 size={20} />} label="Commercial" value={stats.commercial} color="#f59e0b" />
          <StatCard icon={<Landmark size={20} />} label="Luxury Plots" value={stats.plots} color="#10b981" />
        </div>

        {/* Search & Filter Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          alignItems: 'center', 
          background: 'white', 
          padding: '1rem', 
          borderRadius: '16px', 
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search projects by title or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem 0.75rem 2.8rem', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Filter size={18} style={{ color: '#64748b' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Residential', 'Commercial', 'Luxury Plots', 'Industrial'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: '1px solid #e2e8f0',
                    background: filterCategory === cat ? '#0f172a' : 'white',
                    color: filterCategory === cat ? 'white' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        {(isAdding || editingId) && (
          <div style={{ 
            background: 'white', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            marginBottom: '3rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {editingId ? <Edit2 size={24} style={{ color: 'var(--accent)' }} /> : <Plus size={24} style={{ color: 'var(--accent)' }} />}
                {editingId ? 'Update Listing' : 'Create New Listing'}
              </h3>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                style={{ background: 'transparent', color: '#64748b' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={editingId ? (e) => handleUpdate(e, editingId) : handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Project Title</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Exact Location</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <select 
                        className="form-input"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Luxury Plots</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Image URL</label>
                      <input 
                        type="text" 
                        required 
                        className="form-input"
                        placeholder="Paste image link..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Listing Photos Preview</label>
                    <div style={{ 
                      width: '100%', 
                      height: '210px', 
                      borderRadius: '16px', 
                      background: '#f8fafc',
                      border: '2px dashed #e2e8f0',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                          <LayoutGrid size={40} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                          <p style={{ fontSize: '0.85rem' }}>Image preview will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Short Description</label>
                    <textarea 
                      className="form-input"
                      style={{ height: '100px' }}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ background: '#0f172a', color: 'white', padding: '0.85rem 2rem' }}>
                  <Save size={18} /> {editingId ? 'Update Changes' : 'Publish Property'}
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  style={{ border: '1px solid #e2e8f0', padding: '0.85rem 2rem' }}
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Confirmation Modal Overlay */}
        {deleteId && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', maxWidth: '400px', textAlign: 'center' }}>
              <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}>
                <Trash2 size={48} />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Are you sure?</h4>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>This action cannot be undone. This project will be permanently removed from your portfolio.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => confirmDelete(deleteId)} style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', background: '#ef4444', color: 'white' }}>Delete</button>
                <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Projects List with Grid View */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <div key={project.id} style={{ 
                background: 'white', 
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    background: 'rgba(255,255,255,0.9)', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: '#0f172a' }}>{project.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <X size={14} /> {project.location}
                    </p>
                  </div>
                  <div style={{ 
                    marginTop: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => startEdit(project)}
                        style={{ padding: '0.6rem', background: '#f8fafc', color: '#64748b', borderRadius: '10px', transition: 'all 0.2s' }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(project.id)}
                        style={{ padding: '0.6rem', background: '#fff1f2', color: '#f43f5e', borderRadius: '10px' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> Live
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              padding: '6rem 2rem', 
              textAlign: 'center', 
              background: 'white', 
              borderRadius: '24px',
              color: '#94a3b8',
              border: '2px dashed #e2e8f0'
            }}>
              <Search size={48} style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number, color: string }> = ({ icon, label, value, color }) => (
  <div style={{ 
    background: 'white', 
    padding: '1.5rem', 
    borderRadius: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1.25rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9'
  }}>
    <div style={{ 
      background: `${color}15`, 
      color: color, 
      padding: '0.85rem', 
      borderRadius: '12px' 
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{label}</p>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>{value}</h3>
    </div>
  </div>
);

const labelStyle = {
  display: 'block',
  marginBottom: '0.6rem',
  fontWeight: 600,
  fontSize: '0.85rem',
  color: '#475569',
  letterSpacing: '0.025em'
};

export default AdminPage;
