import{_ as s,c as a,o as n,a as o}from"./app.e9a2f893.js";const C=JSON.parse('{"title":"Mounting","description":"","frontmatter":{},"headers":[{"level":2,"title":"Global","slug":"global","link":"#global","children":[]},{"level":2,"title":"Local","slug":"local","link":"#local","children":[]}],"relativePath":"guide/mounting.md"}'),l={name:"guide/mounting.md"},e=o(`<h1 id="mounting" tabindex="-1">Mounting <a class="header-anchor" href="#mounting" aria-hidden="true">#</a></h1><p>The following structure, enables a handler or router to be mounted on a specific path (string or Regexp).</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">router.METHOD(PATH, INSTANCE)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>It is also possible to mount the handler or router without specifying a path:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">router.METHOD(INSTANCE)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Where:</p><ul><li><strong>router</strong> represents a router instance</li><li><strong>METHOD</strong> can be an HTTP method (get, post, ...) in lowercase, to restrict the handler to a specific HTTP method. Otherwise, the <code>use</code> method can be used to respond to any HTTP method. <a href="./mounting-methods.html">Read more</a></li><li><strong>PATH</strong> defines the relative endpoint of the handler <a href="#path">Read more</a></li><li><strong>INSTANCE</strong> is an (error-) handler or router instance</li></ul><h2 id="global" tabindex="-1">Global <a class="header-anchor" href="#global" aria-hidden="true">#</a></h2><p><strong><code>Handler</code></strong></p><p>Respond to any request</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello world!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong><code>Router</code></strong></p><p>Mount a router instance to another one</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> child </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Router</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(child)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="local" tabindex="-1">Local <a class="header-anchor" href="#local" aria-hidden="true">#</a></h2><p><strong><code>Handler</code></strong></p><p>Mount a handler on the <code>/</code> path</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello world!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong><code>Router</code></strong></p><p>Mount a router instance to another one on the <code>/</code> path</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> child </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Router</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> child)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,21),p=[e];function t(r,c,i,y,D,d){return n(),a("div",null,p)}const F=s(l,[["render",t]]);export{C as __pageData,F as default};