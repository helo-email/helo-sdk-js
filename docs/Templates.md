# Helo.templates

| Method                                      | HTTP request                    | Description             |
| ------------------------------------------- | ------------------------------- | ----------------------- |
| [**list**](Templates.md#list)               | **GET** /templates              | List all templates      |
| [**create**](Templates.md#create)           | **POST** /templates             | Create a template       |
| [**renderDraft**](Templates.md#renderDraft) | **POST** /templates/render      | Render template content |
| [**retrieve**](Templates.md#retrieve)       | **GET** /templates/{id}         | Retrieve a template     |
| [**update**](Templates.md#update)           | **PATCH** /templates/{id}       | Update a template       |
| [**del**](Templates.md#del)                 | **DELETE** /templates/{id}      | Delete a template       |
| [**render**](Templates.md#render)           | **POST** /templates/{id}/render | Render a template       |

## list

> list({ ... }) → Object

List all templates

Retrieves a paginated list of templates, optionally filtered by name or channel.

### Example

```javascript Templates_list
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.list({
  limit: 10,
  offset: 10,
  name: "example",
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## create

> create({ ... }) → Object

Create a template

Creates a new template from HTML, MJML, or plain-text content. MJML is compiled to HTML when the template is saved.

### Example

```javascript Templates_create
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.create({
  name: "test-name",
  subject: "test-subject",
  html: "test-html",
  mjml: "test-mjml",
  text: "test-text",
  channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
});
```

## renderDraft

> renderDraft({ ... }) → Object

Render template content

Renders unsaved template content (subject, HTML or MJML, and text) with sample data, without persisting anything.

### Example

```javascript Templates_renderDraft
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.renderDraft({
  subject: "test-subject",
  html: "test-html",
  mjml: "test-mjml",
  text: "test-text",
  inlineStyles: true,
  data: {},
});
```

## retrieve

> retrieve(id) → Object

Retrieve a template

Fetches the details and content of a specific template.

### Example

```javascript Templates_retrieve
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.retrieve(
  "550e8400-e29b-41d4-a716-446655440000",
);
```

## update

> update(id, { ... }) → Object

Update a template

Modifies an existing template. Only the provided fields are changed.

### Example

```javascript Templates_update
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.update(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    name: "test-name",
    subject: "test-subject",
    html: "test-html",
    mjml: "test-mjml",
    text: "test-text",
    channelIds: ["550e8400-e29b-41d4-a716-446655440000"],
    version: 123,
  },
);
```

## del

> del(id) → null

Delete a template

Permanently removes a template. This action cannot be undone.

### Example

```javascript Templates_delete
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

await helo.templates.del("550e8400-e29b-41d4-a716-446655440000");
```

## render

> render(id, { ... }) → Object

Render a template

Renders a saved template with sample data, to preview the output before sending.

### Example

```javascript Templates_render
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

const result = await helo.templates.render(
  "550e8400-e29b-41d4-a716-446655440000",
  {
    inlineStyles: true,
    data: {},
  },
);
```
