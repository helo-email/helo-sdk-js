# Helo.templates

| Method                                      | HTTP request                    | Description           |
| ------------------------------------------- | ------------------------------- | --------------------- |
| [**list**](Templates.md#list)               | **GET** /templates              | list operation        |
| [**create**](Templates.md#create)           | **POST** /templates             | create operation      |
| [**renderDraft**](Templates.md#renderDraft) | **POST** /templates/render      | renderDraft operation |
| [**retrieve**](Templates.md#retrieve)       | **GET** /templates/{id}         | retrieve operation    |
| [**update**](Templates.md#update)           | **PATCH** /templates/{id}       | update operation      |
| [**del**](Templates.md#del)                 | **DELETE** /templates/{id}      | del operation         |
| [**render**](Templates.md#render)           | **POST** /templates/{id}/render | render operation      |

## list

> list({ ... }) → Object

list operation

Fetch a paginated list of templates.

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

create operation

Create a new template.

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

renderDraft operation

Render ad-hoc template content (Subject/Html/Text) with sample data, without persisting anything.

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

retrieve operation

Fetch a single template.

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

update operation

Update an existing template.

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

del operation

Delete a template.

### Example

```javascript Templates_delete
import Helo from "@helo-email/sdk";

const apiKey = process.env.HELO_API_KEY;
const helo = new Helo(apiKey);

await helo.templates.del("550e8400-e29b-41d4-a716-446655440000");
```

## render

> render(id, { ... }) → Object

render operation

Render a saved template with sample data.

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
