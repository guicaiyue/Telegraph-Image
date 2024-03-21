export async function onRequestPost(context) {  // Contents of context object  
    const {   
        request, // same as existing Worker API    
    env, // same as existing Worker API    
    params, // if filename includes [id] or [[path]]   
     waitUntil, // same as ctx.waitUntil in existing Worker API    
     next, // used for middleware or to fetch assets    
     data, // arbitrary space for passing data between middlewares 
     } = context;
     context.request
     const url = new URL(request.url);

     let uploadDomains = context.env.UPLOAD_DOMAINS;
     if (uploadDomains != null && uploadDomains != "") {
      uploadDomains = uploadDomains.split(",");
       let Referer = request.headers.get('Referer');
       if(typeof request.headers.get('Referer') == "undefined" ||request.headers.get('Referer') == null || request.headers.get('Referer') == ""){
          return new Response('权限不足', { status: 403 });
       }else {
        let refererUrl = new URL(Referer);
        if (!uploadDomains.includes(refererUrl.hostname)) {
          return new Response('权限不足', { status: 403 });
        }
       }
     }

     const response = fetch('https://telegra.ph/' + url.pathname + url.search, {
         method: request.method,
         headers: request.headers,
         body: request.body,
     });
    return response;
  }
  