// src/pages/TeacherAuth.jsx
import React, { useState } from 'react';
const API = import.meta.env.VITE_API_URL;
export default function TeacherAuth() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name:'', login_id:'', password:'', subject:''});
  const [message, setMessage] = useState('');

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async () => {
    const endpoint = isRegister ? '/api/teacher/register' : '/api/teacher/login';
    try {
      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ ' + (data.message || 'Success'));
        if (!isRegister && data.teacher) {
          localStorage.setItem('teacher', JSON.stringify(data.teacher));
          window.location.href = '/teacher-dashboard';
        }
      } else setMessage('❌ ' + (data.message || 'Error'));
    } catch {
      setMessage('⚠️ Cannot connect to server');
    }
  };

  return (
    <div style={{display:'flex',minHeight:'80vh',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:360,padding:20,border:'1px solid #ddd',borderRadius:8}}>
        <h3 style={{textAlign:'center'}}>{isRegister ? 'Register Teacher':'Teacher Login'}</h3>
        {isRegister && <input name="name" placeholder="Name" value={form.name} onChange={change} style={{width:'100%',padding:8,marginBottom:8}} />}
        <input name="login_id" placeholder="Login ID" value={form.login_id} onChange={change} style={{width:'100%',padding:8,marginBottom:8}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} style={{width:'100%',padding:8,marginBottom:8}} />
        {isRegister && <input name="subject" placeholder="Subject (optional)" value={form.subject} onChange={change} style={{width:'100%',padding:8,marginBottom:8}} />}
        <button onClick={submit} style={{width:'100%',padding:8,marginTop:6}}>{isRegister ? 'Register':'Login'}</button>
        <p style={{textAlign:'center',cursor:'pointer',color:'#0077ff'}} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have account? Login' : "Don't have account? Register"}
        </p>
        <p style={{textAlign:'center'}}>{message}</p>
      </div>
    </div>
  );
}
