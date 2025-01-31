import Resolver from '@forge/resolver';
import api, { route } from "@forge/api";


const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});


resolver.define('getChangelog', async (req) => {
  console.log('getChangelog');
  console.log(req);
  console.log(JSON.stringify(req.context.extension));
  const issueId = req.context.extension.issue.id;
  console.log(issueId);

  
  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueId}/changelog`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  return response.json();
});

export const handler = resolver.getDefinitions();
