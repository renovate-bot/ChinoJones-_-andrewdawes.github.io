const os_stats = {
	commits: 20,
	files: 203,
	projects: 16
};

function update_os_stats() {
	document.getElementById('os_commits').textContent = os_stats.commits;
	document.getElementById('os_files').textContent = os_stats.files;
	document.getElementById('os_projects').textContent = os_stats.projects;
}

update_os_stats();