const attempt_login = async() => {
    const user_field = document.getElementById('user');
    const pass_field = document.getElementById('pass');
    const user = user_field.value;
    const pass = pass_field.value;

    const success = await post('/admin/login_attempt', {username: user, password: pass})

    if(success){
        window.location.href = '/admin'
    }else{
        const result_field = document.getElementById('login-result')
        result_field.style.display = 'contents'
    }

    
}