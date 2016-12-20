from django import template

register = template.Library()


@register.inclusion_tag('client/map_view.html')
def client_map_view_html(options=None):
    """
    Client Map View html template tag.
    """
    return dict()

@register.inclusion_tag('client/map_detail.html')
def client_map_detail_view_html(options=None):
    """
    Client Map Detail View html template tag.
    """
    return dict()

@register.inclusion_tag('client/map_new.html')
def client_map_new_html(options=None):
    """
    Client Map View html template tag.
    """
    return dict()

@register.inclusion_tag('client/layer_map.html')
def client_layer_map_html(options=None):
    """
    Client Map View html template tag.
    """
    return dict()

@register.inclusion_tag('client/_client_composer_js.html')
def client_viewer_js(options=None):
    """
    React Client Composer js template tag.
    """
    return dict()

@register.inclusion_tag('client/_client_viewer_js.html')
def client_viewer_js(options=None):
    """
    React client viewer js template tag.
    """
    return dict()
