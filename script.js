const $ = e=>document.querySelector(e);
const licenses = {
	"mit": "MIT License",
	"unlicense": "Unlicense"
}

window.addEventListener("load",()=>{
	$("button.create").addEventListener("click", function(){
		this.setAttribute("disabled", "disabled");
		const repoName = $("input#repoName").value;
		const projName = $("input#projName").value ? $("input#projName").value : repoName;
		const lic = $("select.license").value;

		if(repoName && lic){
			fetch("./Template.md").then(r=>r.text()).then(t=>{
				const date = new Date();
				const df = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
				const created = t.replace(/PROJ/g, projName).replace(/REPO/g, repoName).replace(/\[LIC\]/g, licenses[lic]).replace(/XXXX\.XX\.XX/g, df);
				console.log(created)

				let filename = prompt("Filename?", "README.md");
				filename = filename ? filename : "README.md";

				const blob = new Blob([created], {"type": "text/plain"});
				let link = document.createElement('a');
			    link.href = URL.createObjectURL(blob);
			    link.download = filename;
			    link.click();
			});
		}
		this.removeAttribute("disabled", "disabled");
	});
});
