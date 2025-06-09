document.getElementById('saveButton').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value;

    if (noteText) {
        //Simpan catatan ke local storage
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const timestamp = new Date().toLocaleDateString(); //Mendapatkan Tanggal dan Waktu saat ini
        notes.push({ text: noteText, date: timestamp }); //Simpan objek dengan Teks dan Tanggal
        localStorage.setItem('notes', JSON.stringify(notes));

        //Tampilkan catatan
        displayNotes();
        noteInput.value = ''; //kosongkan input(textarea)
    }
});

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; //Kosongkan daftar catatan

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    //Balikkan urutan catatan agar catatan terbaru muncul di atas
    notes.reverse().forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <span>${note.text}<br><small>${note.date}</small></span>
            <button class="hapus-button" onclick="hapusCatatan(${notes.length - 1 - index})">Hapus</button>
            `;
        notesList.appendChild(noteDiv);
    });
}

function hapusCatatan(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.splice(index, 1); // menghapus catatan berdasarkan index
    localStorage.setItem('notes', JSON.stringify(notes)); // menyimpan perubahan ke local storage
    displayNotes(); //Tampilkan catatan yang diperbarui
}

//Tampilkan catatan saat halaman dimuat
window.onload = displayNotes;
