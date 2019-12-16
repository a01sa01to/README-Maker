const $ = e=>document.querySelector(e);

const licenses = {
	"al2": "Apache License 2.0",
	"ggpl3": "GNU General Public License v3.0",
	"mit": "MIT License",
	"b2c": "BSD 2-Clause \"Simplified\" License",
	"b3c": "BSD 3-Clause \"New\" or \"Revised\" License",
	"ccz1": "Create Commons Zero v1.0 Universal",
	"epl2": "Eclipse Public License 2.0",
	"ga3": "GNU Affero  General Public License v3.0",
	"gg2": "GNU General Public License v2.0",
	"gl2": "GNU Lesser General Public License v2.1",
	"gl3": "GNU Lesser General Public License v3.0",
	"mpl2": "Mozilla Public License 2.0",
	"unlicense": "Unlicense",
	"others": "License"
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
		else{
			alert("Please Input all.");
		}
		this.removeAttribute("disabled", "disabled");
	});
});
