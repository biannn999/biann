document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Mencegah halaman agar tidak memuat ulang (reload) saat diklik
    event.preventDefault(); 

    // Mengambil nilai pilihan akun (select) dan password
    const selectedRole = document.getElementById('role').value;
    const passwordInput = document.getElementById('password').value;

    // Validasi apabila ada field yang terlewat
    if (!selectedRole || passwordInput.trim() === "") {
        alert("Harap tentukan jenis akun Anda dan isi password!");
        return;
    }

    // Logika pengujian login sederhana berdasarkan opsi select
    if (selectedRole === "Admin" && passwordInput === "admin123") {
        alert("Login Berhasil!\nSelamat datang, Administrator.");
        // window.location.href = "dashboard_admin.html";
    } else if (selectedRole === "Pelatih" && passwordInput === "pelatih123") {
        alert("Login Berhasil!\nSelamat datang, Pelatih.");
        // window.location.href = "dashboard_pelatih.html";
    } else {
        alert("Login Gagal! Password yang Anda masukkan salah untuk akun " + selectedRole + ".");
    }
});
