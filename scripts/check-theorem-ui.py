"""Controlla caroselli, pannelli ritagliati e regressioni: server locale su :3001 (oppure CC_TEST_ORIGIN)."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

base = os.environ.get('CC_TEST_ORIGIN', 'http://localhost:3001')

with sync_playwright() as p:
    executable = next((Path.home()/'.cache/ms-playwright').glob('chromium-1223/chrome-linux64/chrome'), None)
    browser = p.chromium.launch(headless=True, **({'executable_path': str(executable)} if executable else {}))
    page = browser.new_page(viewport={'width':1280,'height':1000}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' and 'same key' in msg.text else None)
    page.goto(base + '/teoremi',wait_until='networkidle')
    expect(page.get_by_role('heading', name='Teoremi del corso')).to_be_visible()
    rows = page.locator('details[id^=teorema-]')
    expect(rows).to_have_count(93)
    expect(page.locator('[aria-roledescription=carosello]')).to_have_count(93)
    expect(page.locator('.katex-error')).to_have_count(0)
    row = page.locator('#teorema-linear-speedup')
    row.locator(':scope > summary').click()
    carousel = row.locator('[aria-roledescription=carosello]')
    expect(carousel.get_by_role('button',name='Immagine precedente')).to_be_disabled()
    for n in range(1,5): carousel.get_by_role('button',name='Immagine successiva').click()
    expect(carousel.get_by_role('button',name='Passo 5: Scegli m abbastanza grande')).to_have_attribute('aria-pressed','true')
    expect(carousel.get_by_role('button',name='Immagine successiva')).to_be_disabled()
    assert 'I passaggi essenziali' not in carousel.inner_text(), 'redundant theorem footer'
    frame = carousel.locator('figure[aria-hidden=false] img')
    expect(frame).to_be_visible()
    page.wait_for_function('(img)=>img.complete && img.naturalWidth>0', arg=frame.element_handle())
    assert frame.evaluate('(img)=>Math.abs(img.getBoundingClientRect().width / img.parentElement.getBoundingClientRect().width - 3)<0.03'), 'incorrect crop columns'
    assert frame.evaluate('(img)=>Math.abs(img.getBoundingClientRect().height / img.parentElement.getBoundingClientRect().height - 4)<0.03'), 'incorrect crop rows'
    row.locator(':scope > summary').click()
    row.locator(':scope > summary').click()
    expect(carousel.get_by_role('button',name='Passo 5: Scegli m abbastanza grande')).to_have_attribute('aria-pressed','true')
    expect(carousel.locator('figure[aria-hidden=false]')).to_contain_text('Scegli m abbastanza grande')
    carousel.get_by_role('button',name='Immagine precedente').focus()
    page.keyboard.press('ArrowLeft')
    expect(carousel.get_by_role('button',name='Passo 4: Esegui una fase intera')).to_have_attribute('aria-pressed','true')
    page.set_viewport_size({'width':360,'height':800})
    expect(carousel.get_by_role('button',name='Passo 4: Esegui una fase intera')).to_have_attribute('aria-pressed','true')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), 'theorems overflow'
    carousel.locator('figure[aria-hidden=false]').scroll_into_view_if_needed()
    page.screenshot(path='/tmp/cc-theorem-mobile.png',full_page=False)
    page.goto(base + '/teoremi#teorema-savitch',wait_until='networkidle')
    savitch = page.locator('#teorema-savitch [aria-roledescription=carosello]')
    expect(savitch).to_be_visible()
    expect(savitch.get_by_role('button',name='Passo 6: Conta pila e record')).to_be_visible()
    for n in range(5): savitch.get_by_role('button',name='Immagine successiva').click()
    expect(savitch.get_by_role('button',name='Immagine successiva')).to_be_disabled()
    previous = savitch.get_by_role('button',name='Immagine precedente').bounding_box()
    next_btn = savitch.get_by_role('button',name='Immagine successiva').bounding_box()
    assert abs(previous['y']-next_btn['y'])<5, 'navigation buttons do not share a row'
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), 'six-step carousel overflows'
    page.goto(base + '/problemi/REACH',wait_until='networkidle')
    problem = page.locator('[aria-roledescription=carosello]')
    expect(problem.get_by_role('button',name='Immagine precedente')).to_be_disabled()
    problem.get_by_role('button',name='Immagine successiva').click()
    problem.get_by_role('button',name='Immagine successiva').click()
    expect(problem.get_by_role('button',name='Immagine successiva')).to_be_disabled()
    expect(problem).to_contain_text('raggiungibile')
    expect(problem.locator('.text-ok.font-semibold')).to_be_visible()
    page.goto(base + '/piani',wait_until='networkidle')
    assert 'Verifica nelle tracce:' not in page.locator('main').inner_text()
    assert not errors, errors
    print('OK: 93 carousels, 3/5/6 steps, exact panel crops, keyboard, reopen, resize, mobile controls, problem regression, PH section removed.')
    browser.close()
