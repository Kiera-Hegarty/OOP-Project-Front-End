**Cloud Native - Sea Creature Project**

Kiera Hegarty

**Introduction**

For this project a CRUD application was to be created that used all the modules covered during training.

Planning:A jira board was created with clear documentation of each stage of creation for this project. 

Database: A ralational database was created in MySQL to store persistent data from the project.

Java SE & Spring Boot: CRUD functional application was created in OOP lanaguage to meet requirements of Jira board.

Testing: Integration testing was used on Back-end with an acceptible level of test coverage.

Frond-end Developement: Working CRUD Functionality front-end website with API integration.

**Planning**

Jira Software was used to create a Kanband board modelled as a Scrum. Within this I craeted epics and user stories linking to issues for both Back-end and Front-end of my project. Tasks were craeted within user stories to break down tasks.

![Jira](https://user-images.githubusercontent.com/98025303/157713124-24679963-04b3-4aa1-94be-46edfde6c088.jpg)

Throughout my project I completed various sprints. In thos case I create 2, one for back-end and one for front-end.

![epics](https://user-images.githubusercontent.com/98025303/157725707-9a4e4631-0ed8-4c7d-98c0-e1ee79440c0b.png)

Throughout this project I updated GitHub with new working code for each step I took. There are 2 GitHub repos for both the Back-end and Front-end of the project. This is the network graph for my back-end repository.

![git](https://user-images.githubusercontent.com/98025303/157724931-eb68143f-b6f5-4688-b40e-9cd48877d8fb.jpg)

Jira board link: https://kiera-hegarty.atlassian.net/jira/software/projects/KAH/boards/4/roadmap

**Database**

In this project 2 databases were needed; MySQL to store persistent data from the application, and H2 was used for testing the Back-end of the application.

MySQL:
Layout for sea craeture database.

![Database](https://user-images.githubusercontent.com/98025303/157716327-cbd58a0a-ff0a-4022-bbc2-231794102314.jpg)

H2:
H2 database was created with SeaCreature-schema.sql and SeaCreature-data.sql files to populate fields for testing

**Back-End**

In this project Java was used in a Spring Boot Framework which met all requirements on my jira board and had the correct mappings.

	@PostMapping("/create")
	public ResponseEntity<SeaCreature> createSeaCreature(@RequestBody SeaCreature s){
		SeaCreature created = this.service.create(s);
		ResponseEntity<SeaCreature> response = new ResponseEntity<SeaCreature>(created, HttpStatus.CREATED);
		return response;
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<SeaCreature>> getAll(){
		return ResponseEntity.ok(this.service.getAll());
	}
	
	@GetMapping("/getById/{id}") //200 - ok
	public SeaCreature getById(@PathVariable Integer id) {
		return this.service.getById(id);
	}
  
	@PutMapping("/replace/{id}")
	public ResponseEntity<SeaCreature> replace(@PathVariable Integer id, @RequestBody SeaCreature newSeaCreature){
		SeaCreature body = this.service.replace(id,  newSeaCreature);
		ResponseEntity<SeaCreature> reponse = new ResponseEntity<SeaCreature>(body, HttpStatus.ACCEPTED);
		return reponse;
	}
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?> remove(@PathVariable Integer id){
		this.service.remove(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
  
  **Testing**
  
  In this porject integration testing was used, in this case MockMVC\ was used. Which mocked the seaCreatureController to mock the HTTP requests. This the tested the endpoint of the HTTP outcome.
  
![Testing](https://user-images.githubusercontent.com/98025303/157719088-85e59e5d-892e-4947-bcbb-b594d2cdd246.jpg)

This test also gave an acceptable amount coverage for the project.

![Coverage](https://user-images.githubusercontent.com/98025303/157719292-bff0a6fb-a336-4cad-b075-e5b2953a6d91.jpg)

**Front-End**
For this project HTML, CSS and JavaScript was used to create the front-end. A Bootstrap framework was used, this inclued using forms.

HTML and CSS was used to design the main look for the website.

![Design](https://user-images.githubusercontent.com/98025303/157722458-5e972617-6be3-4fa9-8ea2-accf7cc6b7af.jpg)

I then used JavaScript to to connect to the database through API integration. This also modelled the update and delete buttons.

![JS](https://user-images.githubusercontent.com/98025303/157723290-648419a3-bf66-4815-bc43-d783021ef11d.jpg)



