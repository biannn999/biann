/* =====================================================
   ABSENSI PELATIH
   IT CLUB PESANTREN
===================================================== */


/* =====================================================
   DATA EKSTRAKURIKULER
===================================================== */

const coaches = [

    {
        name: "Ahmad Fauzan",
        sport: "Sepak Bola"
    },

    {
        name: "Rizky Maulana",
        sport: "Bulu Tangkis"
    },

    {
        name: "Fajar Hidayat",
        sport: "Bola Voli"
    },

    {
        name: "Dimas Pratama",
        sport: "Bola Basket"
    },

    {
        name: "Ilham Ramadhan",
        sport: "Futsal"
    },

    {
        name: "Arif Setiawan",
        sport: "Pencak Silat"
    }

];


/* =====================================================
   STATE
===================================================== */

const state = {

    user: null,

    role: null,

    attendance: {},

    processed: {}

};


/* =====================================================
   ELEMENT
===================================================== */

const dashboardPage =
    document.getElementById(
        "dashboardPage"
    );


const appPage =
    document.getElementById(
        "appPage"
    );


const loginModal =
    document.getElementById(
        "loginModal"
    );


const confirmationModal =
    document.getElementById(
        "confirmationModal"
    );


const openLoginBtn =
    document.getElementById(
        "openLoginBtn"
    );


const closeLoginBtn =
    document.getElementById(
        "closeLoginBtn"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


const confirmationCloseBtn =
    document.getElementById(
        "confirmationCloseBtn"
    );


const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


const participantLoginForm =
    document.getElementById(
        "participantLoginForm"
    );


const attendanceFormContainer =
    document.getElementById(
        "attendanceFormContainer"
    );


let revealObserver;

let confirmationCallback = null;


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupRevealAnimations();

        buildAttendanceList();

        updateDashboardStats();

        openLoginBtn.addEventListener(
            "click",
            openLogin
        );


        closeLoginBtn.addEventListener(
            "click",
            closeLogin
        );


        logoutBtn.addEventListener(
            "click",
            logout
        );


        confirmationCloseBtn.addEventListener(
            "click",
            closeConfirmation
        );


        adminLoginForm.addEventListener(
            "submit",
            handleAdminLogin
        );


        participantLoginForm.addEventListener(
            "submit",
            handleParticipantLogin
        );


        /*
            Klik backdrop untuk menutup modal
        */

        loginModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === loginModal ||
                    event.target.classList.contains(
                        "modal-backdrop"
                    )
                ) {

                    closeLogin();

                }

            }
        );


        confirmationModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === confirmationModal ||
                    event.target.classList.contains(
                        "modal-backdrop"
                    )
                ) {

                    closeConfirmation();

                }

            }
        );


        /*
            Tombol ESC
        */

        window.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeLogin();

                    closeConfirmation();

                }

            }
        );

    }
);


/* =====================================================
   REVEAL ANIMATION
===================================================== */

function setupRevealAnimations() {

    if (revealObserver) {

        revealObserver.disconnect();

    }


    revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    document
        .querySelectorAll(".reveal")
        .forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

}


/* =====================================================
   LOGIN MODAL
===================================================== */

function openLogin() {

    loginModal.classList.remove(
        "hidden"
    );


    loginModal.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(
        function () {

            document
                .getElementById(
                    "adminUsername"
                )
                .focus();

        },
        250
    );

}


function closeLogin() {

    loginModal.classList.add(
        "hidden"
    );


    loginModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

function handleAdminLogin(event) {

    event.preventDefault();


    const username =
        document
            .getElementById(
                "adminUsername"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "adminPassword"
            )
            .value;


    /*
        LOGIN DEMO

        Username:
        admin

        Password:
        admin123
    */

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        state.user =
            username;

        state.role =
            "Admin";


        closeLogin();


        updateSessionUI();


        showConfirmation(
            "Login berhasil",
            "Admin berhasil masuk ke panel absensi.",
            function () {

                closeConfirmation();

                showAppPage();

            }
        );

    }

    else {

        showConfirmation(
            "Login gagal",
            "Username atau password admin salah. Gunakan admin / admin123."
        );

    }

}


/* =====================================================
   PESERTA LOGIN
===================================================== */

function handleParticipantLogin(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "participantName"
            )
            .value
            .trim();


    const sport =
        document
            .getElementById(
                "participantSport"
            )
            .value;


    if (
        !name ||
        !sport
    ) {

        showConfirmation(
            "Data belum lengkap",
            "Silakan isi nama dan pilih cabang olahraga."
        );

        return;

    }


    state.user =
        name;

    state.role =
        "Peserta";


    closeLogin();


    updateSessionUI();


    showConfirmation(
        "Login berhasil",
        `Selamat datang, ${name}.`,
        function () {

            closeConfirmation();

            showAppPage();

        }
    );

}


/* =====================================================
   TAMPILKAN HALAMAN APLIKASI
===================================================== */

function showAppPage() {

    dashboardPage.style.display =
        "none";


    appPage.style.display =
        "block";


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );


    setTimeout(
        function () {

            document
                .querySelectorAll(
                    "#appPage .reveal"
                )
                .forEach(
                    function (element) {

                        element.classList.add(
                            "visible"
                        );

                    }
                );

        },
        50
    );

}


/* =====================================================
   SESSION UI
===================================================== */

function updateSessionUI() {

    const panelTitle =
        document.getElementById(
            "panelTitle"
        );


    const sessionRole =
        document.getElementById(
            "sessionRole"
        );


    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );


    const attendanceHeading =
        document.getElementById(
            "attendanceHeading"
        );


    if (
        state.role === "Admin"
    ) {

        panelTitle.textContent =
            "Admin & Absensi";


        attendanceHeading.textContent =
            "Input Absensi Semua Pelatih";

    }

    else {

        panelTitle.textContent =
            "Absensi Peserta";


        attendanceHeading.textContent =
            "Input Absensi Pelatih";

    }


    sessionRole.textContent =
        state.role || "Panel Sistem";


    welcomeUser.textContent =
        state.user
            ? `Halo, ${state.user}`
            : "";

}


/* =====================================================
   BUILD ABSENSI
===================================================== */

function buildAttendanceList() {

    attendanceFormContainer.innerHTML =
        "";


    coaches.forEach(
        function (coach, index) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "attendance-row reveal reveal-right";


            row.style.setProperty(
                "--delay",
                `${index * 0.06}s`
            );


            row.innerHTML = `

                <div class="coach-name">

                    <strong>
                        ${coach.name}
                    </strong>

                    <small>
                        ${coach.sport}
                    </small>

                </div>


                <select
                    id="status-${index}"
                >

                    <option value="">
                        Pilih status
                    </option>

                    <option value="present">
                        Hadir
                    </option>

                    <option value="absent">
                        Tidak Hadir
                    </option>

                </select>


                <button
                    class="attendance-submit"
                    data-index="${index}"
                >
                    Konfirmasi
                </button>

            `;


            attendanceFormContainer.appendChild(
                row
            );

        }
    );


    /*
        Event tombol konfirmasi
    */

    attendanceFormContainer
        .querySelectorAll(
            ".attendance-submit"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        submitAttendance(
                            index
                        );

                    }
                );

            }
        );


    setTimeout(
        setupRevealAnimations,
        50
    );

}


/* =====================================================
   SUBMIT ABSENSI
===================================================== */

function submitAttendance(index) {

    const select =
        document.getElementById(
            `status-${index}`
        );


    const status =
        select.value;


    const coach =
        coaches[index];


    /*
        Belum pilih status
    */

    if (!status) {

        showConfirmation(
            "Status belum dipilih",
            `Pilih Hadir atau Tidak Hadir untuk ${coach.name}.`
        );

        return;

    }


    /*
        Cek apakah sebelumnya sudah dikonfirmasi
    */

    const previousStatus =
        state.attendance[index];


    if (
        previousStatus === status &&
        state.processed[index]
    ) {

        showConfirmation(
            "Sudah dikonfirmasi",
            `Absensi ${coach.name} sudah dihitung sebagai ${
                status === "present"
                    ? "Hadir"
                    : "Tidak Hadir"
            }.`
        );

        return;

    }


    /*
        Simpan ke memory browser
    */

    state.attendance[index] =
        status;


    state.processed[index] =
        true;


    /*
        Update grafik
    */

    updateDashboardStats();


    /*
        Konfirmasi
    */

    showConfirmation(
        "Absensi berhasil",

        `${coach.name} — ${coach.sport} tercatat sebagai ${
            status === "present"
                ? "Hadir"
                : "Tidak Hadir"
        }.`
    );

}


/* =====================================================
   UPDATE STATISTIK
===================================================== */

function updateDashboardStats() {

    const values =
        Object.values(
            state.attendance
        );


    const present =
        values.filter(
            function (value) {

                return value === "present";

            }
        ).length;


    const absent =
        values.filter(
            function (value) {

                return value === "absent";

            }
        ).length;


    const total =
        present + absent;


    const percent =
        total === 0
            ? 0
            : Math.round(
                (present / total) * 100
            );


    /*
        Angka statistik
    */

    document
        .getElementById(
            "totalPresent"
        )
        .textContent =
        present;


    document
        .getElementById(
            "totalAbsent"
        )
        .textContent =
        absent;


    document
        .getElementById(
            "attendancePercent"
        )
        .textContent =
        `${percent}%`;


    /*
        Grafik
    */

    document
        .getElementById(
            "chartPercent"
        )
        .textContent =
        `${percent}%`;


    document
        .getElementById(
            "legendPresent"
        )
        .textContent =
        present;


    document
        .getElementById(
            "legendAbsent"
        )
        .textContent =
        absent;


    document
        .getElementById(
            "donutChart"
        )
        .style
        .setProperty(
            "--percent",
            `${percent}%`
        );

}


/* =====================================================
   CONFIRMATION MODAL
===================================================== */

function showConfirmation(
    title,
    message,
    callback = null
) {

    document
        .getElementById(
            "confirmationTitle"
        )
        .textContent =
        title;


    document
        .getElementById(
            "confirmationMessage"
        )
        .textContent =
        message;


    confirmationCallback =
        callback;


    confirmationModal.classList.remove(
        "hidden"
    );


    confirmationModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeConfirmation() {

    confirmationModal.classList.add(
        "hidden"
    );


    confirmationModal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        typeof confirmationCallback ===
        "function"
    ) {

        const callback =
            confirmationCallback;


        confirmationCallback =
            null;


        callback();

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    state.user =
        null;

    state.role =
        null;

    state.attendance =
        {};

    state.processed =
        {};


    /*
        Reset input
    */

    document
        .querySelectorAll(
            ".attendance-row select"
        )
        .forEach(
            function (select) {

                select.value =
                    "";

            }
        );


    /*
        Reset statistik
    */

    updateDashboardStats();


    /*
        Reset form login
    */

    adminLoginForm.reset();

    participantLoginForm.reset();


    /*
        Kembali ke dashboard
    */

    appPage.style.display =
        "none";


    dashboardPage.style.display =
        "block";


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}
