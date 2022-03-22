
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\highnav.svelte generated by Svelte v3.42.4 */
    const file$3 = "src\\components\\highnav.svelte";

    function create_fragment$3(ctx) {
    	let nav;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let hr0;
    	let t1;
    	let hr1;
    	let t2;
    	let hr2;
    	let t3;
    	let ul;
    	let li0;
    	let a0;
    	let t5;
    	let li1;
    	let a1;
    	let t7;
    	let li2;
    	let a2;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			hr0 = element("hr");
    			t1 = space();
    			hr1 = element("hr");
    			t2 = space();
    			hr2 = element("hr");
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Services";
    			t5 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "About Us";
    			t7 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Contact Us";
    			if (!src_url_equal(img.src, img_src_value = "media/banner.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "ACK Hukuk Bürosu");
    			attr_dev(img, "class", "svelte-124t1hx");
    			add_location(img, file$3, 52, 4, 1619);
    			attr_dev(hr0, "class", "t svelte-124t1hx");
    			attr_dev(hr0, "noshade", "");
    			add_location(hr0, file$3, 55, 8, 1718);
    			attr_dev(hr1, "class", "m svelte-124t1hx");
    			attr_dev(hr1, "noshade", "");
    			add_location(hr1, file$3, 56, 8, 1752);
    			attr_dev(hr2, "class", "b svelte-124t1hx");
    			attr_dev(hr2, "noshade", "");
    			add_location(hr2, file$3, 57, 8, 1786);
    			attr_dev(div, "class", "ham svelte-124t1hx");
    			add_location(div, file$3, 54, 4, 1676);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-124t1hx");
    			add_location(a0, file$3, 62, 12, 1875);
    			attr_dev(li0, "class", "svelte-124t1hx");
    			add_location(li0, file$3, 61, 8, 1858);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-124t1hx");
    			add_location(a1, file$3, 65, 12, 1939);
    			attr_dev(li1, "class", "svelte-124t1hx");
    			add_location(li1, file$3, 64, 8, 1922);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-124t1hx");
    			add_location(a2, file$3, 68, 12, 2003);
    			attr_dev(li2, "class", "svelte-124t1hx");
    			add_location(li2, file$3, 67, 8, 1986);
    			attr_dev(ul, "class", "svelte-124t1hx");
    			add_location(ul, file$3, 60, 4, 1828);
    			attr_dev(nav, "class", "svelte-124t1hx");
    			add_location(nav, file$3, 51, 0, 1609);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, img);
    			append_dev(nav, t0);
    			append_dev(nav, div);
    			append_dev(div, hr0);
    			append_dev(div, t1);
    			append_dev(div, hr1);
    			append_dev(div, t2);
    			append_dev(div, hr2);
    			/*div_binding*/ ctx[2](div);
    			append_dev(nav, t3);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			/*ul_binding*/ ctx[3](ul);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			/*div_binding*/ ctx[2](null);
    			/*ul_binding*/ ctx[3](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Highnav', slots, []);
    	let menu;
    	let ham;
    	let hamstate = true;
    	ham = document.querySelector("nav .ham");
    	menu = document.querySelector("nav ul");

    	onMount(() => {
    		if (ham.style.display != "none") {
    			ham.addEventListener("click", () => {
    				if (hamstate) {
    					$$invalidate(1, ham.children[0].style.transform = "translateY(0.30rem) rotate(30deg)", ham);
    					$$invalidate(1, ham.children[1].style.transform = "translateX(-44%) rotate(90deg)", ham);
    					$$invalidate(1, ham.children[2].style.transform = "translateY(-0.23rem) rotate(-30deg)", ham);
    					hamstate = false;
    					$$invalidate(0, menu.style.display = "block", menu);
    					$$invalidate(0, menu.style.transform = "translateX(0px)", menu);

    					window.addEventListener("scroll", e => {
    						$$invalidate(1, ham.children[0].style.transform = "", ham);
    						$$invalidate(1, ham.children[1].style.transform = "", ham);
    						$$invalidate(1, ham.children[2].style.transform = "", ham);
    						hamstate = true;
    						($$invalidate(0, menu.style.display = "none", menu), $$invalidate(0, menu.style.transform = "", menu));
    					});
    				} else {
    					$$invalidate(1, ham.children[0].style.transform = "", ham);
    					$$invalidate(1, ham.children[1].style.transform = "", ham);
    					$$invalidate(1, ham.children[2].style.transform = "", ham);
    					hamstate = true;
    					($$invalidate(0, menu.style.display = "none", menu), $$invalidate(0, menu.style.transform = "", menu));
    				}
    			});
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Highnav> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ham = $$value;
    			$$invalidate(1, ham);
    		});
    	}

    	function ul_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			menu = $$value;
    			$$invalidate(0, menu);
    		});
    	}

    	$$self.$capture_state = () => ({ onMount, menu, ham, hamstate });

    	$$self.$inject_state = $$props => {
    		if ('menu' in $$props) $$invalidate(0, menu = $$props.menu);
    		if ('ham' in $$props) $$invalidate(1, ham = $$props.ham);
    		if ('hamstate' in $$props) hamstate = $$props.hamstate;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [menu, ham, div_binding, ul_binding];
    }

    class Highnav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Highnav",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\contact.svelte generated by Svelte v3.42.4 */

    const { console: console_1 } = globals;
    const file$2 = "src\\components\\contact.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let a2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			a1 = element("a");
    			img1 = element("img");
    			t1 = space();
    			a2 = element("a");
    			a2.textContent = "Contact Us";
    			if (!src_url_equal(img0.src, img0_src_value = "media/phone.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "phone");
    			attr_dev(img0, "class", "svelte-inxc4o");
    			add_location(img0, file$2, 23, 8, 2488);
    			attr_dev(a0, "class", "phone svelte-inxc4o");
    			attr_dev(a0, "href", "tel:");
    			add_location(a0, file$2, 22, 4, 2450);
    			if (!src_url_equal(img1.src, img1_src_value = "media/mail.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "mail");
    			attr_dev(img1, "class", "svelte-inxc4o");
    			add_location(img1, file$2, 27, 8, 2614);
    			attr_dev(a1, "class", "mail svelte-inxc4o");
    			attr_dev(a1, "href", "mailto:akifsahinkorkmaz@outlook.com");
    			add_location(a1, file$2, 26, 4, 2546);
    			attr_dev(a2, "class", "contact svelte-inxc4o");
    			attr_dev(a2, "href", "/");
    			add_location(a2, file$2, 30, 4, 2666);
    			attr_dev(div, "class", "svelte-inxc4o");
    			add_location(div, file$2, 20, 0, 2419);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(a0, img0);
    			append_dev(div, t0);
    			append_dev(div, a1);
    			append_dev(a1, img1);
    			append_dev(div, t1);
    			append_dev(div, a2);
    			/*div_binding*/ ctx[1](div);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[1](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let ctc;

    	onMount(() => {
    		let check = false;

    		function x(a) {
    			if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i).test(a) || (/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(a.substr(0, 4))) {
    				check = true;
    			}

    			console.log(check);
    		}

    		x(navigator.userAgent || navigator.vendor || window.opera);

    		if (!check) {
    			$$invalidate(0, ctc.style.transform = "translateX(-50%) rotate(-90deg) translateY(-1.8rem)", ctc);
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ctc = $$value;
    			$$invalidate(0, ctc);
    		});
    	}

    	$$self.$capture_state = () => ({ onMount, ctc });

    	$$self.$inject_state = $$props => {
    		if ('ctc' in $$props) $$invalidate(0, ctc = $$props.ctc);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ctc, div_binding];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\home.svelte generated by Svelte v3.42.4 */
    const file$1 = "src\\components\\home.svelte";

    function create_fragment$1(ctx) {
    	let article;
    	let div5;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div0;
    	let t1;
    	let div2;
    	let h1;
    	let t3;
    	let h20;
    	let t5;
    	let p0;
    	let t6;
    	let a0;
    	let t8;
    	let div4;
    	let h21;
    	let t10;
    	let div3;
    	let a1;
    	let p1;
    	let t12;
    	let a2;
    	let p2;
    	let t14;
    	let a3;
    	let p3;
    	let t16;
    	let a4;
    	let p4;
    	let t18;
    	let a5;
    	let p5;
    	let t20;
    	let a6;
    	let p6;
    	let t22;
    	let div12;
    	let h22;
    	let t24;
    	let div11;
    	let hr0;
    	let t25;
    	let div6;
    	let img1;
    	let img1_src_value;
    	let t26;
    	let h30;
    	let t28;
    	let p7;
    	let t30;
    	let hr1;
    	let t31;
    	let div7;
    	let img2;
    	let img2_src_value;
    	let t32;
    	let h31;
    	let t34;
    	let p8;
    	let t36;
    	let hr2;
    	let t37;
    	let div8;
    	let img3;
    	let img3_src_value;
    	let t38;
    	let h32;
    	let t40;
    	let p9;
    	let t42;
    	let hr3;
    	let t43;
    	let div9;
    	let img4;
    	let img4_src_value;
    	let t44;
    	let h33;
    	let t46;
    	let p10;
    	let t48;
    	let hr4;
    	let t49;
    	let div10;
    	let img5;
    	let img5_src_value;
    	let t50;
    	let h34;
    	let t52;
    	let p11;
    	let t54;
    	let hr5;
    	let t55;
    	let div15;
    	let h23;
    	let t57;
    	let div14;
    	let hr6;
    	let t58;
    	let div13;
    	let img6;
    	let img6_src_value;
    	let t59;
    	let h35;
    	let t61;
    	let p12;
    	let t63;
    	let div16;
    	let h24;
    	let t65;
    	let ul;
    	let li0;
    	let p13;
    	let t67;
    	let li1;
    	let p14;
    	let t69;
    	let li2;
    	let p15;
    	let t71;
    	let h25;

    	const block = {
    		c: function create() {
    			article = element("article");
    			div5 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "LOREM Law Firm";
    			t3 = space();
    			h20 = element("h2");
    			h20.textContent = "Lorem Ipsum Dolor!";
    			t5 = space();
    			p0 = element("p");
    			t6 = text("Sit, amet consectetur adipisicing elit. Officia, laboriosam. Incidunt recusandae cupiditate veritatis, voluptates quidem voluptas id ea labore quas sint, delectus dolorem! Sequi sed corrupti delectus tempora. ");
    			a0 = element("a");
    			a0.textContent = "Learn more about us.";
    			t8 = space();
    			div4 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Our Services";
    			t10 = space();
    			div3 = element("div");
    			a1 = element("a");
    			p1 = element("p");
    			p1.textContent = "Lorem Ipsum";
    			t12 = space();
    			a2 = element("a");
    			p2 = element("p");
    			p2.textContent = "Dolor Sit Amet";
    			t14 = space();
    			a3 = element("a");
    			p3 = element("p");
    			p3.textContent = "amet consectetur";
    			t16 = space();
    			a4 = element("a");
    			p4 = element("p");
    			p4.textContent = "adipisicing";
    			t18 = space();
    			a5 = element("a");
    			p5 = element("p");
    			p5.textContent = "Officia laboriosam";
    			t20 = space();
    			a6 = element("a");
    			p6 = element("p");
    			p6.textContent = "Incidunt";
    			t22 = space();
    			div12 = element("div");
    			h22 = element("h2");
    			h22.textContent = "Our Team";
    			t24 = space();
    			div11 = element("div");
    			hr0 = element("hr");
    			t25 = space();
    			div6 = element("div");
    			img1 = element("img");
    			t26 = space();
    			h30 = element("h3");
    			h30.textContent = "Atty. Lorem Ipsum Dolor";
    			t28 = space();
    			p7 = element("p");
    			p7.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae unde atque, quaerat id, nihil repudiandae eius sed ab perspiciatis perferendis earum similique aspernatur aliquid itaque ipsam? Explicabo, incidunt ea.";
    			t30 = space();
    			hr1 = element("hr");
    			t31 = space();
    			div7 = element("div");
    			img2 = element("img");
    			t32 = space();
    			h31 = element("h3");
    			h31.textContent = "Atty. Sitamet Consectetur";
    			t34 = space();
    			p8 = element("p");
    			p8.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam suscipit totam quia vero tenetur quasi reiciendis est dolorum perferendis labore laboriosam asperiores hic, excepturi quam fugiat corporis doloremque minus adipisci?";
    			t36 = space();
    			hr2 = element("hr");
    			t37 = space();
    			div8 = element("div");
    			img3 = element("img");
    			t38 = space();
    			h32 = element("h3");
    			h32.textContent = "Lwy. Magnam Suscipit";
    			t40 = space();
    			p9 = element("p");
    			p9.textContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus maiores nostrum excepturi fugit amet voluptate praesentium aliquid reprehenderit natus facilis reiciendis, blanditiis debitis repellat soluta id explicabo dicta sit consequuntur!";
    			t42 = space();
    			hr3 = element("hr");
    			t43 = space();
    			div9 = element("div");
    			img4 = element("img");
    			t44 = space();
    			h33 = element("h3");
    			h33.textContent = "Secy. Delectus Maiores";
    			t46 = space();
    			p10 = element("p");
    			p10.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi aliquid veritatis omnis ipsam rem distinctio eius qui quibusdam minus temporibus consequatur obcaecati cupiditate fugiat earum eligendi incidunt, a itaque inventore.";
    			t48 = space();
    			hr4 = element("hr");
    			t49 = space();
    			div10 = element("div");
    			img5 = element("img");
    			t50 = space();
    			h34 = element("h3");
    			h34.textContent = "Secy. Nisi Aliquid";
    			t52 = space();
    			p11 = element("p");
    			p11.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quaerat ea ratione voluptatibus dignissimos ullam, sapiente ex tempore dolorem libero debitis nulla earum consequatur excepturi illum ipsa corrupti error autem.";
    			t54 = space();
    			hr5 = element("hr");
    			t55 = space();
    			div15 = element("div");
    			h23 = element("h2");
    			h23.textContent = "Recent Cases";
    			t57 = space();
    			div14 = element("div");
    			hr6 = element("hr");
    			t58 = space();
    			div13 = element("div");
    			img6 = element("img");
    			t59 = space();
    			h35 = element("h3");
    			h35.textContent = "Atty. Lorem Ipsum Dolor";
    			t61 = space();
    			p12 = element("p");
    			p12.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae unde atque, quaerat id, nihil repudiandae eius sed ab perspiciatis perferendis earum similique aspernatur aliquid itaque ipsam? Explicabo, incidunt ea.";
    			t63 = space();
    			div16 = element("div");
    			h24 = element("h2");
    			h24.textContent = "Disclaimer";
    			t65 = space();
    			ul = element("ul");
    			li0 = element("li");
    			p13 = element("p");
    			p13.textContent = "This is not a legitimate Law Firm's website.";
    			t67 = space();
    			li1 = element("li");
    			p14 = element("p");
    			p14.textContent = "None of the contents of this website is real, all made up!";
    			t69 = space();
    			li2 = element("li");
    			p15 = element("p");
    			p15.textContent = "This website is coded purely for artistic purposes.";
    			t71 = space();
    			h25 = element("h2");
    			h25.textContent = "Disclaimer";
    			if (!src_url_equal(img0.src, img0_src_value = "media/kitaplık.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Book Shelf");
    			attr_dev(img0, "class", "svelte-16791k9");
    			add_location(img0, file$1, 16, 12, 353);
    			attr_dev(div0, "class", "svelte-16791k9");
    			add_location(div0, file$1, 17, 12, 413);
    			attr_dev(div1, "class", "image svelte-16791k9");
    			add_location(div1, file$1, 15, 8, 321);
    			attr_dev(h1, "class", "svelte-16791k9");
    			add_location(h1, file$1, 20, 12, 482);
    			attr_dev(h20, "class", "svelte-16791k9");
    			add_location(h20, file$1, 21, 12, 518);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-16791k9");
    			add_location(a0, file$1, 22, 225, 771);
    			attr_dev(p0, "class", "svelte-16791k9");
    			add_location(p0, file$1, 22, 12, 558);
    			attr_dev(div2, "class", "content svelte-16791k9");
    			add_location(div2, file$1, 19, 8, 448);
    			attr_dev(h21, "class", "svelte-16791k9");
    			add_location(h21, file$1, 26, 12, 875);
    			attr_dev(p1, "class", "svelte-16791k9");
    			add_location(p1, file$1, 28, 28, 943);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-16791k9");
    			add_location(a1, file$1, 28, 16, 931);
    			attr_dev(p2, "class", "svelte-16791k9");
    			add_location(p2, file$1, 29, 28, 994);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-16791k9");
    			add_location(a2, file$1, 29, 16, 982);
    			attr_dev(p3, "class", "svelte-16791k9");
    			add_location(p3, file$1, 30, 28, 1048);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "class", "svelte-16791k9");
    			add_location(a3, file$1, 30, 16, 1036);
    			attr_dev(p4, "class", "svelte-16791k9");
    			add_location(p4, file$1, 31, 28, 1104);
    			attr_dev(a4, "href", "/");
    			attr_dev(a4, "class", "svelte-16791k9");
    			add_location(a4, file$1, 31, 16, 1092);
    			attr_dev(p5, "class", "svelte-16791k9");
    			add_location(p5, file$1, 32, 28, 1155);
    			attr_dev(a5, "href", "/");
    			attr_dev(a5, "class", "svelte-16791k9");
    			add_location(a5, file$1, 32, 16, 1143);
    			attr_dev(p6, "class", "svelte-16791k9");
    			add_location(p6, file$1, 33, 28, 1213);
    			attr_dev(a6, "href", "/");
    			attr_dev(a6, "class", "svelte-16791k9");
    			add_location(a6, file$1, 33, 16, 1201);
    			attr_dev(div3, "class", "svelte-16791k9");
    			add_location(div3, file$1, 27, 12, 909);
    			attr_dev(div4, "class", "services svelte-16791k9");
    			add_location(div4, file$1, 24, 8, 835);
    			attr_dev(div5, "id", "landing");
    			attr_dev(div5, "class", "svelte-16791k9");
    			add_location(div5, file$1, 14, 4, 294);
    			attr_dev(h22, "class", "svelte-16791k9");
    			add_location(h22, file$1, 40, 8, 1312);
    			attr_dev(hr0, "noshade", "");
    			attr_dev(hr0, "class", "svelte-16791k9");
    			add_location(hr0, file$1, 43, 12, 1373);
    			if (!src_url_equal(img1.src, img1_src_value = "media/team1.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Team Member");
    			attr_dev(img1, "class", "svelte-16791k9");
    			add_location(img1, file$1, 46, 16, 1439);
    			attr_dev(h30, "class", "svelte-16791k9");
    			add_location(h30, file$1, 47, 16, 1501);
    			attr_dev(p7, "class", "svelte-16791k9");
    			add_location(p7, file$1, 48, 16, 1550);
    			attr_dev(div6, "class", "member svelte-16791k9");
    			add_location(div6, file$1, 45, 12, 1402);
    			attr_dev(hr1, "noshade", "");
    			attr_dev(hr1, "class", "svelte-16791k9");
    			add_location(hr1, file$1, 51, 12, 1815);
    			if (!src_url_equal(img2.src, img2_src_value = "media/team2.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Team Member");
    			attr_dev(img2, "class", "svelte-16791k9");
    			add_location(img2, file$1, 54, 16, 1893);
    			attr_dev(h31, "class", "svelte-16791k9");
    			add_location(h31, file$1, 55, 16, 1955);
    			attr_dev(p8, "class", "svelte-16791k9");
    			add_location(p8, file$1, 56, 16, 2006);
    			attr_dev(div7, "class", "member svelte-16791k9");
    			add_location(div7, file$1, 53, 12, 1856);
    			attr_dev(hr2, "noshade", "");
    			attr_dev(hr2, "class", "svelte-16791k9");
    			add_location(hr2, file$1, 59, 12, 2287);
    			if (!src_url_equal(img3.src, img3_src_value = "media/team3.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "Team Member");
    			attr_dev(img3, "class", "svelte-16791k9");
    			add_location(img3, file$1, 62, 16, 2353);
    			attr_dev(h32, "class", "svelte-16791k9");
    			add_location(h32, file$1, 63, 16, 2415);
    			attr_dev(p9, "class", "svelte-16791k9");
    			add_location(p9, file$1, 64, 16, 2461);
    			attr_dev(div8, "class", "member svelte-16791k9");
    			add_location(div8, file$1, 61, 12, 2316);
    			attr_dev(hr3, "noshade", "");
    			attr_dev(hr3, "class", "svelte-16791k9");
    			add_location(hr3, file$1, 67, 12, 2746);
    			if (!src_url_equal(img4.src, img4_src_value = "media/team4.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "Team Member");
    			attr_dev(img4, "class", "svelte-16791k9");
    			add_location(img4, file$1, 70, 16, 2812);
    			attr_dev(h33, "class", "svelte-16791k9");
    			add_location(h33, file$1, 71, 16, 2874);
    			attr_dev(p10, "class", "svelte-16791k9");
    			add_location(p10, file$1, 72, 16, 2922);
    			attr_dev(div9, "class", "member svelte-16791k9");
    			add_location(div9, file$1, 69, 12, 2775);
    			attr_dev(hr4, "noshade", "");
    			attr_dev(hr4, "class", "svelte-16791k9");
    			add_location(hr4, file$1, 75, 12, 3190);
    			if (!src_url_equal(img5.src, img5_src_value = "media/team5.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "Team Member");
    			attr_dev(img5, "class", "svelte-16791k9");
    			add_location(img5, file$1, 78, 16, 3268);
    			attr_dev(h34, "class", "svelte-16791k9");
    			add_location(h34, file$1, 79, 16, 3330);
    			attr_dev(p11, "class", "svelte-16791k9");
    			add_location(p11, file$1, 80, 16, 3374);
    			attr_dev(div10, "class", "member svelte-16791k9");
    			add_location(div10, file$1, 77, 12, 3231);
    			attr_dev(hr5, "noshade", "");
    			attr_dev(hr5, "class", "svelte-16791k9");
    			add_location(hr5, file$1, 83, 12, 3652);
    			attr_dev(div11, "class", "members svelte-16791k9");
    			add_location(div11, file$1, 42, 8, 1339);
    			attr_dev(div12, "id", "team");
    			attr_dev(div12, "class", "svelte-16791k9");
    			add_location(div12, file$1, 39, 4, 1288);
    			attr_dev(h23, "class", "svelte-16791k9");
    			add_location(h23, file$1, 90, 8, 3733);
    			attr_dev(hr6, "noshade", "");
    			add_location(hr6, file$1, 93, 12, 3796);
    			if (!src_url_equal(img6.src, img6_src_value = "media/team1.png")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "Team Member");
    			attr_dev(img6, "class", "svelte-16791k9");
    			add_location(img6, file$1, 96, 16, 3860);
    			add_location(h35, file$1, 97, 16, 3922);
    			attr_dev(p12, "class", "svelte-16791k9");
    			add_location(p12, file$1, 98, 16, 3971);
    			attr_dev(div13, "class", "case svelte-16791k9");
    			add_location(div13, file$1, 95, 12, 3825);
    			attr_dev(div14, "class", "cases svelte-16791k9");
    			add_location(div14, file$1, 92, 8, 3764);
    			attr_dev(div15, "id", "cases");
    			attr_dev(div15, "class", "svelte-16791k9");
    			add_location(div15, file$1, 89, 4, 3708);
    			attr_dev(h24, "class", "svelte-16791k9");
    			add_location(h24, file$1, 109, 8, 4315);
    			attr_dev(p13, "class", "svelte-16791k9");
    			add_location(p13, file$1, 112, 16, 4381);
    			add_location(li0, file$1, 111, 12, 4360);
    			attr_dev(p14, "class", "svelte-16791k9");
    			add_location(p14, file$1, 115, 16, 4484);
    			add_location(li1, file$1, 114, 12, 4463);
    			attr_dev(p15, "class", "svelte-16791k9");
    			add_location(p15, file$1, 118, 16, 4601);
    			add_location(li2, file$1, 117, 12, 4580);
    			attr_dev(ul, "class", "svelte-16791k9");
    			add_location(ul, file$1, 110, 8, 4343);
    			attr_dev(h25, "class", "svelte-16791k9");
    			add_location(h25, file$1, 121, 8, 4700);
    			attr_dev(div16, "id", "disclaimer");
    			attr_dev(div16, "class", "svelte-16791k9");
    			add_location(div16, file$1, 107, 4, 4276);
    			attr_dev(article, "class", "svelte-16791k9");
    			add_location(article, file$1, 13, 0, 280);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div5);
    			append_dev(div5, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div5, t1);
    			append_dev(div5, div2);
    			append_dev(div2, h1);
    			append_dev(div2, t3);
    			append_dev(div2, h20);
    			append_dev(div2, t5);
    			append_dev(div2, p0);
    			append_dev(p0, t6);
    			append_dev(p0, a0);
    			append_dev(div5, t8);
    			append_dev(div5, div4);
    			append_dev(div4, h21);
    			append_dev(div4, t10);
    			append_dev(div4, div3);
    			append_dev(div3, a1);
    			append_dev(a1, p1);
    			append_dev(div3, t12);
    			append_dev(div3, a2);
    			append_dev(a2, p2);
    			append_dev(div3, t14);
    			append_dev(div3, a3);
    			append_dev(a3, p3);
    			append_dev(div3, t16);
    			append_dev(div3, a4);
    			append_dev(a4, p4);
    			append_dev(div3, t18);
    			append_dev(div3, a5);
    			append_dev(a5, p5);
    			append_dev(div3, t20);
    			append_dev(div3, a6);
    			append_dev(a6, p6);
    			append_dev(article, t22);
    			append_dev(article, div12);
    			append_dev(div12, h22);
    			append_dev(div12, t24);
    			append_dev(div12, div11);
    			append_dev(div11, hr0);
    			append_dev(div11, t25);
    			append_dev(div11, div6);
    			append_dev(div6, img1);
    			append_dev(div6, t26);
    			append_dev(div6, h30);
    			append_dev(div6, t28);
    			append_dev(div6, p7);
    			append_dev(div11, t30);
    			append_dev(div11, hr1);
    			append_dev(div11, t31);
    			append_dev(div11, div7);
    			append_dev(div7, img2);
    			append_dev(div7, t32);
    			append_dev(div7, h31);
    			append_dev(div7, t34);
    			append_dev(div7, p8);
    			append_dev(div11, t36);
    			append_dev(div11, hr2);
    			append_dev(div11, t37);
    			append_dev(div11, div8);
    			append_dev(div8, img3);
    			append_dev(div8, t38);
    			append_dev(div8, h32);
    			append_dev(div8, t40);
    			append_dev(div8, p9);
    			append_dev(div11, t42);
    			append_dev(div11, hr3);
    			append_dev(div11, t43);
    			append_dev(div11, div9);
    			append_dev(div9, img4);
    			append_dev(div9, t44);
    			append_dev(div9, h33);
    			append_dev(div9, t46);
    			append_dev(div9, p10);
    			append_dev(div11, t48);
    			append_dev(div11, hr4);
    			append_dev(div11, t49);
    			append_dev(div11, div10);
    			append_dev(div10, img5);
    			append_dev(div10, t50);
    			append_dev(div10, h34);
    			append_dev(div10, t52);
    			append_dev(div10, p11);
    			append_dev(div11, t54);
    			append_dev(div11, hr5);
    			append_dev(article, t55);
    			append_dev(article, div15);
    			append_dev(div15, h23);
    			append_dev(div15, t57);
    			append_dev(div15, div14);
    			append_dev(div14, hr6);
    			append_dev(div14, t58);
    			append_dev(div14, div13);
    			append_dev(div13, img6);
    			append_dev(div13, t59);
    			append_dev(div13, h35);
    			append_dev(div13, t61);
    			append_dev(div13, p12);
    			append_dev(article, t63);
    			append_dev(article, div16);
    			append_dev(div16, h24);
    			append_dev(div16, t65);
    			append_dev(div16, ul);
    			append_dev(ul, li0);
    			append_dev(li0, p13);
    			append_dev(ul, t67);
    			append_dev(ul, li1);
    			append_dev(li1, p14);
    			append_dev(ul, t69);
    			append_dev(ul, li2);
    			append_dev(li2, p15);
    			append_dev(div16, t71);
    			append_dev(div16, h25);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);

    	onMount(() => {
    		setTimeout(
    			() => {
    				if (window.confirm("This is an artistic project. See disclaimer below!")) {
    					window.location.href = "#disclaimer";
    				}
    			},
    			5000
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount });
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.42.4 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let highnav;
    	let t0;
    	let home;
    	let t1;
    	let contact;
    	let current;
    	highnav = new Highnav({ $$inline: true });
    	home = new Home({ $$inline: true });
    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(highnav.$$.fragment);
    			t0 = space();
    			create_component(home.$$.fragment);
    			t1 = space();
    			create_component(contact.$$.fragment);
    			attr_dev(main, "class", "svelte-1hmjutf");
    			add_location(main, file, 8, 0, 173);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(highnav, main, null);
    			append_dev(main, t0);
    			mount_component(home, main, null);
    			append_dev(main, t1);
    			mount_component(contact, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(highnav.$$.fragment, local);
    			transition_in(home.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(highnav.$$.fragment, local);
    			transition_out(home.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(highnav);
    			destroy_component(home);
    			destroy_component(contact);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Highnav, Contact, Home });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
