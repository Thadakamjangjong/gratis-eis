// Gratis Eis App - Do Good
import { useState } from 'react';
import { Check, MapPin, Gift, ChevronRight, Loader2 } from 'lucide-react';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [plzOrt, setPlzOrt] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyIFM_CTJlTAhfdLGZD4cob8neF9pK6rh_6I6kJ509XJuBr9hLCo3OVmk6xJvqhW8Bcg/exec';

  const handleSubmit = async () => {
    if (!name || !email || !adresse || !plzOrt || !selected) return;
    
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        produkt: selected === 'schoki' ? 'Mövenpick Schoki' : 'Mövenpick Vanilla',
        name: name,
        email: email,
        adresse: adresse,
        plzOrt: plzOrt
      });
      
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setSubmitted(true);
    }
    
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #4ade80, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
        <div style={{background: 'white', borderRadius: '1.5rem', padding: '2rem', maxWidth: '24rem', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'}}>
          <div style={{width: '5rem', height: '5rem', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'}}>
            <Check style={{width: '2.5rem', height: '2.5rem', color: 'white'}} />
          </div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>Bestellung erfolgreich!</h2>
          <p style={{color: '#6b7280', marginBottom: '1rem'}}>
            Dein Gratis-{selected === 'schoki' ? 'Schoki' : 'Vanilla'} wartet auf dich! 🎉
          </p>
          <div style={{background: '#fffbeb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem', textAlign: 'left'}}>
            <p style={{fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>📍 Abholung:</p>
            <p style={{color: '#4b5563', fontSize: '0.875rem'}}>{adresse}</p>
            <p style={{color: '#4b5563', fontSize: '0.875rem'}}>{plzOrt}</p>
          </div>
          <p style={{fontSize: '0.875rem', color: '#9ca3af'}}>Wir melden uns per E-Mail bei dir!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #fbbf24, #f97316)', padding: '1rem'}}>
      <div style={{maxWidth: '24rem', margin: '0 auto'}}>
        
        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '9999px', color: 'white', marginBottom: '1rem'}}>
            <Gift style={{width: '1.25rem', height: '1.25rem'}} />
            <span style={{fontWeight: '600'}}>GRATIS EIS AKTION</span>
          </div>
          <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>Do Good 🍦</h1>
          <p style={{color: 'rgba(255,255,255,0.8)'}}>10 Mio Gratis Eis für die Schweiz!</p>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
          <div style={{height: '0.5rem', flex: 1, borderRadius: '9999px', background: step >= 1 ? 'white' : 'rgba(255,255,255,0.3)'}} />
          <div style={{height: '0.5rem', flex: 1, borderRadius: '9999px', background: step >= 2 ? 'white' : 'rgba(255,255,255,0.3)'}} />
        </div>

        <div style={{background: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'}}>
          
          {step === 1 && (
            <>
              <h2 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem'}}>Wähle dein Gratis-Eis</h2>
              
              <button
                onClick={() => setSelected('schoki')}
                style={{
                  width: '100%', padding: '1rem', borderRadius: '1rem', 
                  border: selected === 'schoki' ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                  background: selected === 'schoki' ? '#fffbeb' : 'white',
                  marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer'
                }}
              >
                <span style={{fontSize: '3rem'}}>🍫</span>
                <div style={{textAlign: 'left', flex: 1}}>
                  <p style={{fontWeight: 'bold', color: '#1f2937'}}>Mövenpick Schoki</p>
                  <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Cremig & schokoladig</p>
                  <p style={{color: '#16a34a', fontWeight: 'bold'}}>GRATIS</p>
                </div>
                {selected === 'schoki' && (
                  <div style={{width: '1.5rem', height: '1.5rem', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Check style={{width: '1rem', height: '1rem', color: 'white'}} />
                  </div>
                )}
              </button>

              <button
                onClick={() => setSelected('vanilla')}
                style={{
                  width: '100%', padding: '1rem', borderRadius: '1rem',
                  border: selected === 'vanilla' ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                  background: selected === 'vanilla' ? '#fffbeb' : 'white',
                  marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer'
                }}
              >
                <span style={{fontSize: '3rem'}}>🍦</span>
                <div style={{textAlign: 'left', flex: 1}}>
                  <p style={{fontWeight: 'bold', color: '#1f2937'}}>Mövenpick Vanilla</p>
                  <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Klassisch & süss</p>
                  <p style={{color: '#16a34a', fontWeight: 'bold'}}>GRATIS</p>
                </div>
                {selected === 'vanilla' && (
                  <div style={{width: '1.5rem', height: '1.5rem', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Check style={{width: '1rem', height: '1rem', color: 'white'}} />
                  </div>
                )}
              </button>

              <button
                onClick={() => selected && setStep(2)}
                disabled={!selected}
                style={{
                  width: '100%', padding: '1rem', background: 'linear-gradient(to right, #f59e0b, #f97316)',
                  color: 'white', borderRadius: '1rem', fontWeight: 'bold', fontSize: '1.125rem',
                  border: 'none', cursor: selected ? 'pointer' : 'not-allowed', opacity: selected ? 1 : 0.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}
              >
                Weiter <ChevronRight style={{width: '1.25rem', height: '1.25rem'}} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem'}}>Deine Daten</h2>
              
              <div style={{marginBottom: '1.5rem'}}>
                <div style={{marginBottom: '1rem'}}>
                  <label style={{fontSize: '0.875rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem'}}>Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max Muster"
                    style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                </div>
                <div style={{marginBottom: '1rem'}}>
                  <label style={{fontSize: '0.875rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem'}}>E-Mail *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="max@beispiel.ch"
                    style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                </div>
                <div style={{marginBottom: '1rem'}}>
                  <label style={{fontSize: '0.875rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem'}}>Adresse *</label>
                  <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="Musterstrasse 1"
                    style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                </div>
                <div>
                  <label style={{fontSize: '0.875rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem'}}>PLZ & Ort *</label>
                  <input
                    type="text"
                    value={plzOrt}
                    onChange={(e) => setPlzOrt(e.target.value)}
                    placeholder="8000 Zürich"
                    style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box'}}
                  />
                </div>
              </div>

              <div style={{background: '#f9fafb', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem'}}>
                <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem'}}>Deine Auswahl</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{fontSize: '1.875rem'}}>{selected === 'schoki' ? '🍫' : '🍦'}</span>
                  <div>
                    <p style={{fontWeight: 'bold', color: '#1f2937'}}>Mövenpick {selected === 'schoki' ? 'Schoki' : 'Vanilla'}</p>
                    <p style={{color: '#16a34a', fontWeight: '600'}}>GRATIS</p>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '0.75rem'}}>
                <button
                  onClick={() => setStep(1)}
                  style={{padding: '1rem 1.5rem', border: '1px solid #e5e7eb', borderRadius: '1rem', fontWeight: '600', color: '#4b5563', background: 'white', cursor: 'pointer'}}
                >
                  Zurück
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!name || !email || !adresse || !plzOrt || loading}
                  style={{
                    flex: 1, padding: '1rem', background: 'linear-gradient(to right, #f59e0b, #f97316)',
                    color: 'white', borderRadius: '1rem', fontWeight: 'bold', fontSize: '1.125rem',
                    border: 'none', cursor: (!name || !email || !adresse || !plzOrt || loading) ? 'not-allowed' : 'pointer',
                    opacity: (!name || !email || !adresse || !plzOrt || loading) ? 0.5 : 1
                  }}
                >
                  {loading ? 'Senden...' : 'Gratis bestellen 🎉'}
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>
          <p>🇨🇭 Für alle in der Schweiz</p>
          <p style={{marginTop: '0.25rem'}}>Jede Wohnung = Dein Laden!</p>
        </div>
      </div>
    </div>
  );
}
