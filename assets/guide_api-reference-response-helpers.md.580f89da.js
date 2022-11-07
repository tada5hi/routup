import{_ as s,c as e,o as n,a}from"./app.833cfb19.js";const D=JSON.parse('{"title":"Response Helpers","description":"","frontmatter":{},"headers":[{"level":2,"title":"setResponseCacheHeaders","slug":"setresponsecacheheaders","link":"#setresponsecacheheaders","children":[]},{"level":2,"title":"appendResponseHeaderDirective","slug":"appendresponseheaderdirective","link":"#appendresponseheaderdirective","children":[]},{"level":2,"title":"setResponseHeaderAttachment","slug":"setresponseheaderattachment","link":"#setresponseheaderattachment","children":[]},{"level":2,"title":"setResponseHeaderContentType","slug":"setresponseheadercontenttype","link":"#setresponseheadercontenttype","children":[]},{"level":2,"title":"send","slug":"send","link":"#send","children":[]},{"level":2,"title":"sendFile","slug":"sendfile","link":"#sendfile","children":[]},{"level":2,"title":"sendRedirect","slug":"sendredirect","link":"#sendredirect","children":[]},{"level":2,"title":"sendStream","slug":"sendstream","link":"#sendstream","children":[]}],"relativePath":"guide/api-reference-response-helpers.md"}'),p={name:"guide/api-reference-response-helpers.md"},l=a(`<h1 id="response-helpers" tabindex="-1">Response Helpers <a class="header-anchor" href="#response-helpers" aria-hidden="true">#</a></h1><h2 id="setresponsecacheheaders" tabindex="-1"><code>setResponseCacheHeaders</code> <a class="header-anchor" href="#setresponsecacheheaders" aria-hidden="true">#</a></h2><p>Set cache headers (<code>last-modified</code> &amp; <code>cache-control</code>) depending on the options input.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setResponseCacheHeaders</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Response</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResponseCacheHeadersOptions</span></span>
<span class="line"><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ResponseCacheHeadersOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">maxAge</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">modifiedTime</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Date</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cacheControls</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">[]</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h2 id="appendresponseheaderdirective" tabindex="-1"><code>appendResponseHeaderDirective</code> <a class="header-anchor" href="#appendresponseheaderdirective" aria-hidden="true">#</a></h2><p>Append a header directive to an existent response header. If the header is not present in the response, then the header will be created.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">appendResponseHeaderDirective</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServerResponse</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OutgoingHttpHeader</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h2 id="setresponseheaderattachment" tabindex="-1"><code>setResponseHeaderAttachment</code> <a class="header-anchor" href="#setresponseheaderattachment" aria-hidden="true">#</a></h2><p>Set the <code>Content-Disposition</code> response header and adds the filename directive, if a filename is provided as function argument. In addition, it sets the <code>Content-Type</code> based on the extension of the filename.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setResponseHeaderAttachment</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServerResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">filename</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="setresponseheadercontenttype" tabindex="-1"><code>setResponseHeaderContentType</code> <a class="header-anchor" href="#setresponseheadercontenttype" aria-hidden="true">#</a></h2><p>Set the <code>Content-Type</code> response header.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">setResponseHeaderContentType</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServerResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">ifNotExists</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>
<span class="line"><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="send" tabindex="-1"><code>send</code> <a class="header-anchor" href="#send" aria-hidden="true">#</a></h2><p>Send is properly the most important response helper. It accepts any input data (optional), as argument and negotiate the content-type of the input data and sends a formatted response to client.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">send</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Response</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">chunk</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="sendfile" tabindex="-1"><code>sendFile</code> <a class="header-anchor" href="#sendfile" aria-hidden="true">#</a></h2><p>Send a local file to the client.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sendFile</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServerResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">filePath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">fn</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Next</span></span>
<span class="line"><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="sendredirect" tabindex="-1"><code>sendRedirect</code> <a class="header-anchor" href="#sendredirect" aria-hidden="true">#</a></h2><p>Redirect the client to another location.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sendRedirect</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Response</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">location</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">statusCode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">302</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="sendstream" tabindex="-1"><code>sendStream</code> <a class="header-anchor" href="#sendstream" aria-hidden="true">#</a></h2><p>Send a readable stream to the client.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sendStream</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ServerResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">stream</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Readable</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">fn</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Next</span></span>
<span class="line"><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div>`,25),o=[l];function t(c,r,i,C,y,d){return n(),e("div",null,o)}const F=s(p,[["render",t]]);export{D as __pageData,F as default};
